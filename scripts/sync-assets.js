import fs from 'node:fs';
import path from 'node:path';

/**
 * File extensions to be synchronized from src to dist
 *
 * @type {string[]}
 */
const ASSET_EXTENSIONS = ['.vue', '.scss', '.css', '.svg', '.png', '.json'];

/**
 * Recursively synchronizes assets from source to destination directory
 *
 * @param {string} src  The source directory path
 * @param {string} dest The destination directory path
 *
 * @returns {void}
 */
function syncAssets(src, dest)
{
    if (!fs.existsSync(src))
    {
        return;
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries)
    {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory())
        {
            syncAssets(srcPath, destPath);
            continue;
        }

        if (ASSET_EXTENSIONS.includes(path.extname(entry.name)))
        {
            // Ensure the destination directory exists before copying
            const destDir = path.dirname(destPath);
            if (!fs.existsSync(destDir))
            {
                fs.mkdirSync(destDir, { recursive: true });
            }

            fs.copyFileSync(srcPath, destPath);
            console.log(`  📦 Copied: ${path.relative(process.cwd(), srcPath)} -> ${path.relative(process.cwd(), destPath)}`);
        }
    }
}

/**
 * Main execution context
 */
const pkgDir = process.cwd();
const srcDir = path.join(pkgDir, 'src');
const distDir = path.join(pkgDir, 'dist');

console.log(`🚀 Synchronizing assets for: ${path.basename(pkgDir)}`);
syncAssets(srcDir, distDir);
console.log('✨ Asset synchronization complete.');
