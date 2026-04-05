import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '..');
const packagesDir = path.join(rootPath, 'packages');

// Get all directories in /packages
const packages = fs.readdirSync(packagesDir).filter((f) =>
    fs.statSync(path.join(packagesDir, f)).isDirectory()
);

const versionMap = {};

packages.forEach((pkg) => {
    const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
        const { version, name } = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
        versionMap[name] = version;
    }
});

const uniqueVersions = [...new Set(Object.values(versionMap))];

if (uniqueVersions.length > 1) {
    console.error('❌ Version Mismatch Detected!');
    console.table(versionMap);
    process.exit(1);
}

console.log(`✅ All packages are synchronized at version: ${uniqueVersions[0]}`);

process.exit(0);
