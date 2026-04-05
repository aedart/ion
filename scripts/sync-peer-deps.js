import fs from 'node:fs';
import path from 'node:path';

const ROOT_PKG_PATH = path.join(process.cwd(), 'package.json');
const PACKAGES_DIR = path.join(process.cwd(), 'packages');

/**
 * Syncs peerDependencies from all workspace packages into root devDependencies
 */
function syncPeerDeps()
{
    if (!fs.existsSync(ROOT_PKG_PATH)) {
        console.error('❌ Root package.json not found.');
        return;
    }

    const rootPkg = JSON.parse(fs.readFileSync(ROOT_PKG_PATH, 'utf8'));
    const rootDevDeps = rootPkg.devDependencies || {};
    let updated = false;

    // 1. Scan packages directory
    const packages = fs.readdirSync(PACKAGES_DIR).filter(f =>
        fs.statSync(path.join(PACKAGES_DIR, f)).isDirectory()
    );

    for (const pkgName of packages) {
        const pkgJsonPath = path.join(PACKAGES_DIR, pkgName, 'package.json');

        if (fs.existsSync(pkgJsonPath)) {
            const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
            const peerDeps = pkgJson.peerDependencies || {};

            for (const [dep, version] of Object.entries(peerDeps)) {
                // Only add if not already present in root devDependencies
                if (!rootDevDeps[dep]) {
                    console.log(`➕ Adding ${dep}@${version} from ${pkgName} to root`);
                    rootDevDeps[dep] = version;
                    updated = true;
                }
            }
        }
    }

    // 2. Save changes if any updates were made
    if (updated) {
        rootPkg.devDependencies = Object.keys(rootDevDeps)
            .sort()
            .reduce((obj, key) => {
                obj[key] = rootDevDeps[key];
                return obj;
            }, {});

        fs.writeFileSync(ROOT_PKG_PATH, JSON.stringify(rootPkg, null, 4) + '\n');
        console.log('✅ root package.json updated. Run "pnpm install" to apply changes.');
    } else {
        console.log('🙌 All peer dependencies are already satisfied at the root.');
    }
}

syncPeerDeps();
