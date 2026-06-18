<?php
/**
 * Mubix Prompts — OpenRouter Chat Gateway API
 * Path: /api/chat.php (placed in public/api/chat.php)
 */

// Allow cross-origin requests from frontend development servers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// -------------------------------------------------------------
// Helper function to load environment variables from .env files
// -------------------------------------------------------------
function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        return false;
    }
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return false;
    }
    foreach ($lines as $line) {
        $line = trim($line);
        // Skip comments
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }
        // Check for key=value format
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            
            // Strip wrapping quotes
            if (preg_match('/^"(.*)"$/', $value, $matches) || preg_match('/^\'(.*)\'$/', $value, $matches)) {
                $value = $matches[1];
            }
            
            // Set environment variable
            putenv("{$key}={$value}");
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
        }
    }
    return true;
}

// Locate and load environment variables
$rootPath = dirname(dirname(__DIR__));
loadEnv($rootPath . '/.env');
loadEnv($rootPath . '/.env.local');

// Get the API Key from loaded env or system environment
$apiKey = getenv('OPENROUTER_API_KEY');
if (!$apiKey && isset($_ENV['OPENROUTER_API_KEY'])) {
    $apiKey = $_ENV['OPENROUTER_API_KEY'];
}

// -------------------------------------------------------------
// Model Mapping Fallback Rules
// -------------------------------------------------------------
function resolveModel($model) {
    if (empty($model) || $model === "auto") {
        return "google/gemini-2.5-flash"; // Default balanced model
    }
    
    // Direct mappings for friendly IDs or partial names
    $mapping = [
        "chatgpt" => "openai/gpt-4o",
        "claude" => "anthropic/claude-3.5-sonnet",
        "gemini" => "google/gemini-2.5-pro",
        "deepseek" => "deepseek/deepseek-chat",
        "groq" => "meta-llama/llama-3.3-70b-instruct",
        "mistral" => "mistralai/mistral-large",
        "llama" => "meta-llama/llama-3.1-405b-instruct"
    ];

    $lowerModel = strtolower($model);
    if (isset($mapping[$lowerModel])) {
        return $mapping[$lowerModel];
    }

    // Return raw model ID if it contains a slash (meaning it's an explicit OpenRouter path)
    if (strpos($model, '/') !== false) {
        return $model;
    }

    // Default fallback
    return "google/gemini-2.5-flash";
}

// -------------------------------------------------------------
// GET Request Handler: Health Check & Connection Verification
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (empty($apiKey)) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "error" => "Configuration Error",
            "details" => "OPENROUTER_API_KEY is missing from server environment."
        ]);
        exit;
    }

    // Connect to OpenRouter auth check endpoint to verify API key
    $ch = curl_init("https://openrouter.ai/api/v1/auth/key");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $apiKey
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($curlErr) {
        http_response_code(502);
        echo json_encode([
            "status" => "error",
            "error" => "Network Failure",
            "details" => "Could not connect to OpenRouter server: " . $curlErr
        ]);
        exit;
    }

    if ($httpCode === 200) {
        $keyDetails = json_decode($response, true);
        echo json_encode([
            "status" => "online",
            "message" => "AI Connected",
            "limit" => isset($keyDetails['data']['limit']) ? $keyDetails['data']['limit'] : null,
            "usage" => isset($keyDetails['data']['usage']) ? $keyDetails['data']['usage'] : null
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "error" => "API Error",
            "details" => "OpenRouter returned code {$httpCode}. Please check your API key configuration."
        ]);
    }
    exit;
}

// -------------------------------------------------------------
// POST Request Handler: Chat Completions API Gateway
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($apiKey)) {
        http_response_code(500);
        echo json_encode([
            "error" => "Server configuration issue: OPENROUTER_API_KEY is not set."
        ]);
        exit;
    }

    // Read and parse JSON payload
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!$input) {
        http_response_code(400);
        echo json_encode([
            "error" => "Invalid JSON payload."
        ]);
        exit;
    }

    $selectedModel = isset($input['model']) ? trim($input['model']) : 'auto';
    $systemPrompt = isset($input['systemPrompt']) ? trim($input['systemPrompt']) : '';
    $userPrompt = isset($input['userPrompt']) ? trim($input['userPrompt']) : '';
    
    // Extract messages history array or construct one
    $messages = [];
    if (isset($input['messages']) && is_array($input['messages'])) {
        $messages = $input['messages'];
    }

    // Resolve targeted OpenRouter model
    $modelToSend = resolveModel($selectedModel);

    // Build standard messages array payload
    $payloadMessages = [];
    if (!empty($systemPrompt)) {
        $payloadMessages[] = [
            "role" => "system",
            "content" => $systemPrompt
        ];
    }

    // If chat messages array is provided, merge it
    if (!empty($messages)) {
        foreach ($messages as $msg) {
            if (isset($msg['role']) && isset($msg['content'])) {
                $payloadMessages[] = [
                    "role" => $msg['role'],
                    "content" => $msg['content']
                ];
            }
        }
    } elseif (!empty($userPrompt)) {
        // Fallback for direct prompt generation / single message format
        $payloadMessages[] = [
            "role" => "user",
            "content" => $userPrompt
        ];
    }

    if (empty($payloadMessages)) {
        http_response_code(400);
        echo json_encode([
            "error" => "Invalid request: No conversation messages or user prompt provided."
        ]);
        exit;
    }

    // Build OpenRouter HTTP Request Body
    $body = [
        "model" => $modelToSend,
        "messages" => $payloadMessages,
        "temperature" => 0.7
    ];

    // Setup cURL request to OpenRouter API
    $ch = curl_init("https://openrouter.ai/api/v1/chat/completions");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer " . $apiKey,
        "HTTP-Referer: https://mubixprompts.com",
        "X-Title: Mubix Prompts"
    ]);
    
    // Add realistic request timeout (60 seconds for larger reasoning outputs)
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    // Error Handling Cases
    if ($curlErr) {
        http_response_code(504);
        echo json_encode([
            "error" => "Network failure or timeout contacting OpenRouter: " . $curlErr
        ]);
        exit;
    }

    $data = json_decode($response, true);

    if ($httpCode !== 200) {
        $errorMessage = isset($data['error']['message']) ? $data['error']['message'] : "OpenRouter gateway returned code " . $httpCode;
        
        // Handle specific API issues gracefully
        if ($httpCode === 401) {
            $errorMessage = "Invalid API Key. Please verify the OPENROUTER_API_KEY inside your .env configuration.";
        } elseif ($httpCode === 429) {
            $errorMessage = "Rate limit exceeded. Too many requests are hitting OpenRouter.";
        } elseif ($httpCode === 400 && strpos($errorMessage, "model") !== false) {
            $errorMessage = "The selected model ({$modelToSend}) is currently unavailable or invalid on OpenRouter.";
        }

        http_response_code($httpCode);
        echo json_encode([
            "error" => $errorMessage,
            "code" => $httpCode
        ]);
        exit;
    }

    // Extract compiled text response content
    $content = isset($data['choices'][0]['message']['content']) ? $data['choices'][0]['message']['content'] : '';

    if (empty($content) && isset($data['error'])) {
        http_response_code(500);
        echo json_encode([
            "error" => "OpenRouter Error: " . ($data['error']['message'] ?? "Unknown API issue.")
        ]);
        exit;
    }

    // Success response returning clean JSON formatting matching chat UI expectation
    echo json_encode([
        "content" => $content,
        "model" => $modelToSend
    ]);
    exit;
}

// Fallback for unsupported methods
http_response_code(405);
echo json_encode(["error" => "Method Not Allowed"]);
exit;
