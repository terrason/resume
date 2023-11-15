#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd build

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init .
git remote add github https://github.com/terrason/resume
git checkout -b gh-pages
git add -A
git commit -am 'deploy'
git push github gh-pages --force
cd ..
rm -rf build