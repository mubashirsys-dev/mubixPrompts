<div align="center">
  <br />
  <a href="https://github.com/mubashirsys-dev/mubixPrompts">
    <img src="https://raw.githubusercontent.com/mubashirsys-dev/mubixPrompts/main/public/logo.jpeg" alt="MubixPrompts Logo" width="120" height="120" style="border-radius: 20px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);" />
  </a>
  <br />
  <br />

  <h1>MubixPrompts</h1>
  <p>
    <strong>The Ultimate AI-Powered Website Prompt Operating System</strong>
  </p>

  <p>
    Generate massive production-ready master prompts for tools like Antigravity, Claude, ChatGPT, Cursor, Lovable, Bolt, and Windsurf in seconds.
  </p>

  <div align="center">
    <a href="https://github.com/mubashirsys-dev/mubixPrompts/stargazers"><img src="https://img.shields.io/github/stars/mubashirsys-dev/mubixPrompts?style=for-the-badge&logo=github&color=FFD93D&logoColor=black" alt="Stars" /></a>
    <a href="https://github.com/mubashirsys-dev/mubixPrompts/network/members"><img src="https://img.shields.io/github/forks/mubashirsys-dev/mubixPrompts?style=for-the-badge&logo=github&color=FF6B6B&logoColor=black" alt="Forks" /></a>
    <a href="https://github.com/mubashirsys-dev/mubixPrompts/issues"><img src="https://img.shields.io/github/issues/mubashirsys-dev/mubixPrompts?style=for-the-badge&logo=github&color=4ade80&logoColor=black" alt="Issues" /></a>
    <a href="https://github.com/mubashirsys-dev/mubixPrompts/blob/main/LICENSE"><img src="https://img.shields.io/github/license/mubashirsys-dev/mubixPrompts?style=for-the-badge&color=8b5cf6" alt="License" /></a>
  </div>
  <br />
</div>

## 🌌 Overview

**MubixPrompts** is a high-performance, futuristic AI Prompt Operating System tailored specifically for full-stack developers, designers, and non-technical founders. By bridging the gap between raw idea conceptualization and production-ready code generation, MubixPrompts outputs highly complex and structural *Master Prompts*.

Whether you are using **Antigravity**, **Claude 3.5 Sonnet**, **Cursor**, or **Windsurf**, MubixPrompts guarantees precision, maintaining optimal architecture, UI/UX layouts, routing, database schemas, and API definitions—all pre-engineered for you.

---

## ⚡ Why MubixPrompts?

- **Zero to Production in Minutes**: Stop spending hours crafting the "perfect prompt." MubixPrompts generates highly sophisticated, context-aware master prompts.
- **Cross-LLM Compatibility**: Designed to work seamlessly with cutting-edge AI coding agents like *Cursor*, *Lovable*, *Windsurf*, *Bolt*, *ChatGPT*, and *Claude*.
- **Architectural Excellence**: It doesn't just write text; it defines your Theme DNA, routing structure, database schemas, and state management rules.
- **Built for Everyone**: From seasoned Senior Engineers wanting boilerplate out of the way, to beginner non-technical founders needing comprehensive hand-holding.

---

## 🚀 Features

<table width="100%">
  <tr>
    <td width="50%">
      <h3>🛠️ Prompt Builder Wizard</h3>
      A sophisticated multi-step wizard allowing you to select categories, complexity levels, frameworks, design systems, and database requirements. Compile complex parameters into a unified, massive master prompt.
    </td>
    <td width="50%">
      <h3>🎨 Theme Preview Engine</h3>
      A real-time, interactive DNA engine. Visualize typography, color palettes, and component styles before you generate the prompt. Adjust the cyber, brutalist, or minimalist vibes on the fly.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🤖 Live AI Assistants</h3>
      An integrated intelligent chat workspace. Brainstorm your app idea, refine your features, and let the AI proactively suggest the best tech stack and architecture for your specific use-case.
    </td>
    <td width="50%">
      <h3>⚙️ API Setup & Routing Architecture</h3>
      Automated generation of robust Next.js App Router structures, defining complex API layers, TRPC setups, webhook endpoints, and middleware routing schemas.
    </td>
  </tr>
</table>

---

## 📸 Platform Showcase

> **Note:** Add screenshots here after launch to showcase the beautiful interface!

<div align="center">
  <img src="https://via.placeholder.com/1000x500/111111/FFFFFF?text=Prompt+Builder+Wizard+Screenshot" alt="Prompt Builder Wizard" width="80%" style="border-radius: 12px; margin-bottom: 20px; box-shadow: 0px 10px 30px rgba(0,0,0,0.5);" />
  <br/>
  <img src="https://via.placeholder.com/1000x500/111111/FFFFFF?text=Theme+DNA+Engine+Screenshot" alt="Theme Preview Engine" width="80%" style="border-radius: 12px; margin-bottom: 20px; box-shadow: 0px 10px 30px rgba(0,0,0,0.5);" />
  <br/>
  <img src="https://via.placeholder.com/1000x500/111111/FFFFFF?text=Live+AI+Assistant+Screenshot" alt="Live AI Assistant" width="80%" style="border-radius: 12px; box-shadow: 0px 10px 30px rgba(0,0,0,0.5);" />
</div>

---

## 💻 Tech Stack & Architecture

Built with modern tooling for maximum performance and a premium developer experience:

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Architecture**:
  - `src/app/api`: Edge-ready serverless API routes with streaming capabilities.
  - `src/components/builder`: Complex multi-step wizard state components.
  - `src/lib/prompt-engine`: Proprietary text compiler for master prompt synthesis.

---

## 🔌 Local FreeLLMAPI Setup Guide

MubixPrompts is designed to operate with local/free LLM APIs seamlessly.

1. Obtain your free/local LLM endpoint (e.g., via LM Studio, Ollama, or Free API providers).
2. Create a `.env.local` file in the root of your project:
   ```env
   NEXT_PUBLIC_LLM_PROVIDER_URL="http://localhost:11434/v1" # Example for Ollama
   LLM_API_KEY="your-api-key-here"
   ```
3. The platform will automatically route generation requests via the internal `src/app/api/generate/route.ts` API gateway.
4. Use the built-in telemetry panel in the UI to monitor latency and connection status.

---

## 📦 Installation & Usage

Get MubixPrompts running locally in seconds.

### Prerequisites
- Node.js >= 18.17.0
- Git

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/mubashirsys-dev/mubixPrompts.git
cd mubixPrompts

# 2. Install dependencies (NPM, Yarn, or pnpm)
npm install
# or
pnpm install

# 3. Start the development server
npm run dev
```

Visit `http://localhost:3000` to access the OS dashboard.

### CLI Workflow

For developers who want to generate prompts via CLI (Coming Soon):
```bash
npx mubix-prompts init
npx mubix-prompts generate --framework nextjs --ui shadcn --db supabase
```

---

## 🌐 AI Ecosystem Integrations

MubixPrompts acts as the central brain that feeds instructions to other agents:
- **Antigravity**: Optimized for deep codebase reasoning and multi-file architecture.
- **Claude 3.5 Sonnet**: Generates artifact-heavy, UI-focused prompts.
- **Cursor IDE**: Perfect for direct IDE paste-ins as `rules.md` or `.cursorrules`.
- **Windsurf & Lovable**: Blueprint definitions for zero-to-one rapid scaffolding.

---

## 🗺️ Roadmap

- [x] Initial Architecture & V1 UI
- [x] Prompt Compiler Engine Integration
- [x] Theme DNA Visualizer
- [x] Multi-Step Builder Wizard
- [ ] Export directly to `.cursorrules` file
- [ ] CLI Tool integration (`mubixpack`)
- [ ] Community Prompt Marketplace
- [ ] Cloud Synchronization & Authentication

---

## 🤝 Contribution Guide

We welcome contributions from the open-source community!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🌟 Connect & Support

Created with passion by **[Mubashir](https://github.com/mubashirsys-dev)**.

<a href="https://github.com/mubashirsys-dev/mubixPrompts">
  <img src="https://img.shields.io/badge/Support_this_Project-Star_on_GitHub-FFD93D?style=for-the-badge&logo=github&logoColor=black" alt="Star on GitHub" />
</a>

<p align="center">
  <i>Empowering the next generation of AI-assisted engineering.</i>
</p>
