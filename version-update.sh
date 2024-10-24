#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: No version type specified. Please use 'patch', 'minor', or 'major'."
  exit 1
fi

version_type=$1

if [[ "$version_type" != "patch" && "$version_type" != "minor" && "$version_type" != "major" ]]; then
  echo "Error: Invalid version type '$version_type'. Please use 'patch', 'minor', or 'major'."
  exit 1
fi

echo "Incrementing the version to the next $version_type version..."
new_version=$(npm version "$version_type" --no-git-tag-version) || { echo "npm version failed"; exit 1; }

new_version=$(node -p "require('./package.json').version")

echo "Creating tag for new version: v$new_version"
git add package.json
git add package-lock.json
git commit -m "chore: bump version to v$new_version"
git tag "v$new_version"

# Push the new tag and commits to GitHub
echo "Pushing to GitHub..."
git push origin "v$new_version"
git push origin HEAD

echo "Version increment and Git push completed successfully."
