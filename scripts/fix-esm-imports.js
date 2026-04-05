import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const PACKAGES_DIR = path.join(process.cwd(), 'packages');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Recursively fixes relative imports by adding .js extension
 *
 * @param {PathLike|string} dir
 */
function fixImports(dir)
{
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fixImports(fullPath);
            continue;
        }

        if (file.endsWith('.ts') || file.endsWith('.vue')) {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Regex: Matches relative imports/exports missing an extension
            const pattern =
                /(from\s+['"]|import\s+['"]|export\s+.*?\s+from\s+['"])(\.\.?\/[^"'.\n]+)(?=['"])/g;

            const newContent = content.replace(pattern, (match, prefix, importPath) => {
                return `${prefix}${importPath}.js`;
            });

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`  ✅ Fixed: ${fullPath}`);
            }
        }
    }
}

// 1. Get list of packages
const availablePackages = fs.readdirSync(PACKAGES_DIR).filter(file => {
    return fs.statSync(path.join(PACKAGES_DIR, file)).isDirectory();
});

if (availablePackages.length === 0) {
    console.error('❌ No packages found in /packages directory.');
    process.exit(1);
}

// 2. Prompt user
console.log('\n📦 Available Packages:');
availablePackages.forEach((pkg, index) => {
    console.log(`${index + 1}) ${pkg}`);
});

rl.question('\nSelect a package number to fix imports: ', (choice) => {
    const index = parseInt(choice, 10) - 1;
    const selectedPkg = availablePackages[index];

    if (!selectedPkg) {
        console.error('❌ Invalid selection.');
        rl.close();
        return;
    }

    const targetDir = path.join(PACKAGES_DIR, selectedPkg, 'src');

    if (!fs.existsSync(targetDir)) {
        console.error(`❌ Error: 'src' directory not found in ${selectedPkg}`);
    } else {
        console.log(`\n🚀 Fixing ESM imports in: packages/${selectedPkg}/src ...`);
        fixImports(targetDir);
        console.log('✨ Done.');
    }

    rl.close();
});
