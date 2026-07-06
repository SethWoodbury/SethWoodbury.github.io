#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Publish / update https://sethwoodbury.github.io
# Run this from inside the project folder:  ./deploy.sh
# First time only: create an EMPTY public repo named  SethWoodbury.github.io
# at https://github.com/new  (do NOT add a README there), then run this.
# After the first push, enable Pages once:  Settings -> Pages -> Branch: main /(root)
# ---------------------------------------------------------------------------
set -e

USER="SethWoodbury"
REPO="SethWoodbury.github.io"
REMOTE="https://github.com/${USER}/${REPO}.git"

# Initialise git if needed
if [ ! -d .git ]; then
  git init
  git branch -M main
fi

# Point 'origin' at your repo (add or update)
if git remote | grep -q '^origin$'; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

git add -A
git commit -m "Update site ($(date '+%Y-%m-%d %H:%M'))" || echo "Nothing new to commit."
git push -u origin main

echo ""
echo "Pushed to ${REMOTE}"
echo "If this was your first push, enable Pages: Settings -> Pages -> Branch: main /(root)"
echo "Your site: https://sethwoodbury.github.io"
