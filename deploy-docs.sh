#!/usr/bin/env sh

# abort on errors
set -e

# A few properties
repository="git@github.com:aedart/ion.git"
branch="main:gh-pages"
build_directory=".build"

# Create build dir, if needed.
mkdir -p "$build_directory"

# Clear the build directory, but keep the directory
cd "$build_directory"
find . -type f -delete
find . -type d -delete
cd ..

# build the docs
npm run docs:build-prod


# navigate into the build output directory
cd "$build_directory"

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# Init repository and commit all files
git init
git add -A
git commit -m 'deploy docs'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f $repository $branch

cd -
