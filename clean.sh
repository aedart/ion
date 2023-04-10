#!/usr/bin/env sh

# abort on errors
set -e

# Remove all "leftover" *.d.ts and *.d.ts.map files in source directories.
find ./packages/*/src -type f \( -name "*.d.ts*" -and ! -name "shim.d.ts" \) -delete