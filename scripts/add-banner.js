import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/**
 * Generates the banner text based on package.json data.
 *
 * @param {object} pkg The parsed package.json object.
 *
 * @returns {string} The formatted banner string.
 */
function createBanner(pkg)
{
    return `/**
 * ${pkg.name}
 *
 * ${pkg.license || 'MIT'}, Copyright (c) 2023-present Alin Eugen Deac <aedart@gmail.com>.
 */\n\n`;
}

/**
 * Processes a single package directory and prepends banners to build artifacts.
 *
 * @param {string} packageName The folder name within the packages directory.
 *
 * @returns {void}
 */
function processPackage(packageName)
{
    const pkgPath = path.join(ROOT, 'packages', packageName);
    const distPath = path.join(pkgPath, 'dist');
    const pkgJsonPath = path.join(pkgPath, 'package.json');

    // Skip if not a valid package or no build output exists
    if (!fs.existsSync(pkgJsonPath) || !fs.existsSync(distPath)) {
        throw new Error(`❌ dist/ directory not found in ${packageName}. Did tsc run correctly?`);
    }

    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    const banner = createBanner(pkg);
    const signature = ` * ${pkg.name}`; // Unique line to check against

    // Recursively find all distribution files (.js and .d.ts)
    const files = fs.readdirSync(distPath, { recursive: true })
        .map((file) => path.join(distPath, file))
        .filter((file) =>
            fs.statSync(file).isFile()
            && (file.endsWith('.js') || file.endsWith('.d.ts'))
        );

    files.forEach((filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Only prepend if our specific package signature isn't already there.
        // This prevents double-tagging and ignores existing JSDoc blocks.
        if (!content.includes(signature)) {
            fs.writeFileSync(filePath, banner + content);
        }
    });
}

/**
 * Main Execution: Detects context and applies banners.
 *
 * @returns {void}
 */
function run()
{
    // Get the directory where the command is being executed
    const cwd = process.cwd();
    const isRoot = fs.existsSync(path.join(cwd, 'pnpm-workspace.yaml'));

    if (!isRoot) {
        // We are inside a package folder (e.g., /packages/xyz)
        // Extract the folder name from the path
        const packageName = path.basename(cwd);
        processPackage(packageName);
        console.log(`✅ Banner applied to ${packageName}.`);
    } else {
        // We are at the root, process everything
        const packagesDir = path.join(ROOT, 'packages');
        const packages = fs.readdirSync(packagesDir).filter((f) =>
            fs.statSync(path.join(packagesDir, f)).isDirectory()
        );

        packages.forEach(processPackage);
        console.log('✅ Banners applied to all packages.');
    }
}

// Start the process
run();
