import fs from 'node:fs';
import path from 'node:path';

/**
 * File extensions to be synchronized from src to dist
 *
 * @type {string[]}
 */
const ASSET_EXTENSIONS = ['.vue', '.scss', '.css', '.svg', '.png', '.json'];

/**
 * Recursively removes assets from destination if they no longer exist in source
 *
 * @param {string} src  The source directory path
 * @param {string} dest The destination directory path
 *
 * @returns {void}
 */
function cleanupAssets(src, dest)
{
    if (!fs.existsSync(dest))
    {
        return;
    }

    const entries = fs.readdirSync(dest, { withFileTypes: true });

    for (const entry of entries)
    {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory())
        {
            cleanupAssets(srcPath, destPath);

            // Remove empty directories in dist
            if (fs.readdirSync(destPath).length === 0)
            {
                fs.rmdirSync(destPath);
            }
            continue;
        }

        // If it's an asset type we manage, and it's missing from src, delete from dist
        if (ASSET_EXTENSIONS.includes(path.extname(entry.name)) && !fs.existsSync(srcPath))
        {
            fs.unlinkSync(destPath);
            console.log(`  🗑 Removed orphaned asset: ${path.relative(process.cwd(), destPath)}`);
        }
    }
}

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

// 1. Clean up orphaned files first
cleanupAssets(srcDir, distDir);

// 2. Sync current assets
syncAssets(srcDir, distDir);

console.log('✨ Asset synchronization complete.');
