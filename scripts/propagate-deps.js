import fs from 'node:fs';
import path from 'node:path';

const ROOT_PKG_PATH = path.join(process.cwd(), 'package.json');
const PACKAGES_DIR = path.join(process.cwd(), 'packages');

/**
 * Propagates dependency versions from root package.json to all workspace packages
 */
function propagateDependencies()
{
    if (!fs.existsSync(ROOT_PKG_PATH)) {
        console.error('❌ Root package.json not found.');
        process.exit(1);
    }

    const rootPkg = JSON.parse(fs.readFileSync(ROOT_PKG_PATH, 'utf8'));

    // Create a master map of all versions defined at the root
    const rootVersions = {
        ...(rootPkg.dependencies || {}),
        ...(rootPkg.devDependencies || {}),
        ...(rootPkg.peerDependencies || {}),
    };

    const packages = fs.readdirSync(PACKAGES_DIR).filter(f =>
        fs.statSync(path.join(PACKAGES_DIR, f)).isDirectory()
    );

    for (const pkgName of packages) {
        const pkgJsonPath = path.join(PACKAGES_DIR, pkgName, 'package.json');
        if (!fs.existsSync(pkgJsonPath)) continue;

        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        let hasChanged = false;

        ['dependencies', 'devDependencies', 'peerDependencies'].forEach(type => {
            if (!pkgJson[type]) return;

            for (const [dep, currentVersion] of Object.entries(pkgJson[type])) {
                // If root defines this dependency, propagate the version down
                if (rootVersions[dep] && rootVersions[dep] !== currentVersion) {
                    console.log(
                        `📣 [${pkgName}] Propagating ${dep}: ${currentVersion} -> ${
                            rootVersions[dep]
                        }`,
                    );
                    pkgJson[type][dep] = rootVersions[dep];
                    hasChanged = true;
                }
            }
        });

        if (hasChanged) {
            fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 4) + '\n');
        }
    }

    console.log('✨ Propagation complete.');
}

propagateDependencies();
