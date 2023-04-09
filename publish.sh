#!/usr/bin/env sh

# abort on errors
set -e

# Ensure all package's are built.
npm run build

# Run all tests...
# npm run test

# Finally, publish using lerna. Follow onscreen instructions
npx lerna publish --force-publish
