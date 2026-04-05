import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.resolve(__dirname, '../packages/xyz/package.json');

// 1. Get the current version
const { version } = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const tagName = `v${version}`;

try {
    // 2. Check if tag already exists
    const existingTags = execSync('git tag -l').toString();
    if (existingTags.includes(tagName)) {
        console.log(`⚠️  Tag ${tagName} already exists. Skipping.`);
        process.exit(0);
    }

    // 3. Create the tag
    console.log(`🏷️  Creating Git tag: ${tagName}...`);
    execSync(`git tag -a ${tagName} -m "Release ${tagName}"`);
    console.log(`✅ Tag created successfully.`);

    console.log(`🚀 Run 'git push origin ${tagName}' to sync with remote.`);
} catch (error) {
    console.error('❌ Failed to create Git tag:', error.message);
    process.exit(1);
}
