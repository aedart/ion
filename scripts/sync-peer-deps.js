import fs from 'node:fs';
import path from 'node:path';

/**
 * Helper to sort object keys alphabetically.
 *
 * @param {Record<string, string>} obj
 *
 * @returns {Record<string, string>}
 */
function sortObjectKeys(obj)
{
    return Object.keys(obj).sort().reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
}

/**
 * Synchronizes all dependency types from workspace packages into the root package.json.
 * Updates version constraints for external packages and sorts all dependency blocks.
 */
function syncDeps()
{
    const rootPath = path.resolve(process.cwd(), 'package.json');
    const rootJson = JSON.parse(fs.readFileSync(rootPath, 'utf-8'));

    const packagesDir = path.resolve(process.cwd(), 'packages');
    const packages = fs.readdirSync(packagesDir);
    const depTypes = [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
    ];

    packages.forEach((pkg) => {
        const pkgPath = path.join(packagesDir, pkg, 'package.json');
        if (!fs.existsSync(pkgPath)) {
            return;
        }

        const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

        depTypes.forEach((type) => {
            const deps = pkgJson[type] || {};

            Object.keys(deps).forEach((dep) => {
                const version = deps[dep];

                // 1. Skip if it's a workspace-internal dependency
                if (version.startsWith('workspace:')) {
                    return;
                }

                // 2. Update version in the existing root block, or default to devDependencies
                if (rootJson.dependencies?.[dep]) {
                    rootJson.dependencies[dep] = version;
                } else if (rootJson.optionalDependencies?.[dep]) {
                    rootJson.optionalDependencies[dep] = version;
                } else {
                    rootJson.devDependencies = rootJson.devDependencies || {};
                    rootJson.devDependencies[dep] = version;
                }
            });
        });
    });

    // 3. Sort all dependency blocks alphabetically
    if (rootJson.dependencies) rootJson.dependencies = sortObjectKeys(rootJson.dependencies);
    if (rootJson.devDependencies) {
        rootJson.devDependencies = sortObjectKeys(rootJson.devDependencies);
    }
    if (rootJson.optionalDependencies) {
        rootJson.optionalDependencies = sortObjectKeys(rootJson.optionalDependencies);
    }

    fs.writeFileSync(rootPath, JSON.stringify(rootJson, null, 4) + '\n');
    console.log('Successfully synchronized all external dependencies to root.');
}

syncDeps();
