#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const registry_1 = require("./registry");
const program = new commander_1.Command();
program
    .name("mubixpack")
    .description("CLI to download and install premium visual layout components and design systems from MubixPrompts")
    .version("1.0.0");
// Action mapping installer core
const installAction = async (themeId) => {
    const normalizedId = themeId.toLowerCase();
    if (!registry_1.componentRegistry[normalizedId]) {
        console.error(chalk_1.default.red(`\n❌ Error: Visual theme style "${themeId}" was not found in Mubix Registry!`));
        console.log(chalk_1.default.yellow(`Available themes: ${Object.keys(registry_1.componentRegistry).join(", ")}\n`));
        process.exit(1);
    }
    const selectedTheme = registry_1.componentRegistry[normalizedId];
    console.log(chalk_1.default.cyan(`\n📦 Mubix Pack Installer: Preparing visual system for "${selectedTheme.name}"`));
    // Prompt developer for target directories
    const questions = await (0, prompts_1.default)([
        {
            type: "text",
            name: "componentsPath",
            message: "Target directory for React components:",
            initial: "./src/components/mubix"
        },
        {
            type: "text",
            name: "stylesPath",
            message: "Target file for global CSS variables:",
            initial: "./src/app/globals.css"
        }
    ]);
    if (!questions.componentsPath || !questions.stylesPath) {
        console.log(chalk_1.default.red("\n❌ Installation cancelled by developer."));
        process.exit(0);
    }
    const spinner = (0, ora_1.default)(`Downloading components for ${selectedTheme.name}...`).start();
    try {
        // 1. Write Component files
        await fs_extra_1.default.ensureDir(questions.componentsPath);
        for (const [filename, code] of Object.entries(selectedTheme.components)) {
            const destination = path_1.default.join(questions.componentsPath, filename);
            await fs_extra_1.default.writeFile(destination, code, "utf-8");
        }
        spinner.succeed(chalk_1.default.green(`Components successfully installed in: ${questions.componentsPath}`));
        // 2. Append CSS variables
        const cssSpinner = (0, ora_1.default)("Integrating custom CSS variables...").start();
        const cssPath = path_1.default.resolve(questions.stylesPath);
        if (await fs_extra_1.default.pathExists(cssPath)) {
            const existingCss = await fs_extra_1.default.readFile(cssPath, "utf-8");
            if (!existingCss.includes(selectedTheme.css)) {
                await fs_extra_1.default.writeFile(cssPath, `${existingCss}\n\n${selectedTheme.css}`, "utf-8");
            }
            cssSpinner.succeed(chalk_1.default.green(`CSS visual rules appended to: ${questions.stylesPath}`));
        }
        else {
            await fs_extra_1.default.outputFile(cssPath, selectedTheme.css, "utf-8");
            cssSpinner.succeed(chalk_1.default.green(`CSS file created: ${questions.stylesPath}`));
        }
        // 3. Output Tailwind Config Extension Recommendations
        console.log(chalk_1.default.bold.yellow("\n⚡ Recommended Tailwind Config Extensions:"));
        console.log(chalk_1.default.dim(selectedTheme.tailwind));
        console.log(chalk_1.default.bold.green(`\n🎉 Success! Visual style system "${selectedTheme.name}" successfully compiled and installed!\n`));
    }
    catch (err) {
        spinner.fail(chalk_1.default.red("An error occurred during components extraction."));
        console.error(chalk_1.default.red(err.message));
        process.exit(1);
    }
};
// Map primary CLI command mappings
program
    .command("install <theme-id>")
    .description("Install visual components, themes and tailwind presets matching visual style slug")
    .alias("add")
    .action(installAction);
program.parse(process.argv);
