# Controlling your site with git (macOS Terminal)

One-time setup, then a 3-command routine to publish edits. Copy each block into Terminal
(Applications → Utilities → Terminal) and press Return.

---

## 1. One-time setup (about 5 minutes)

### a) Make sure git is installed
```bash
git --version
```
If it prints a version, you're good. If macOS pops up a box offering to install
"command line developer tools," click **Install**, wait, then run it again.

### b) Tell git who you are
```bash
git config --global user.name "Seth Woodbury"
git config --global user.email "woodbuse@uw.edu"
```

### c) Sign in to GitHub (the easy way: GitHub CLI)
This handles login in your browser so you never paste a password or token into a file.

Install it:
```bash
# If you have Homebrew:
brew install gh
# No Homebrew? Download the installer from https://cli.github.com instead.
```
Then log in:
```bash
gh auth login
```
Answer the prompts: **GitHub.com** → **HTTPS** → **Yes** (authenticate git) →
**Login with a web browser**. Copy the one-time code it shows, press Return, and approve
in the browser that opens. Done. Git can now push as you.

---

## 2. Connect your existing site folder to the repo

You already have the folder at `~/Desktop/sethwoodbury.github.io`. Link it to GitHub
without changing any of your files:
```bash
cd ~/Desktop/sethwoodbury.github.io
git init -b main
git remote add origin https://github.com/SethWoodbury/SethWoodbury.github.io.git
git fetch origin
git reset origin/main
git status
```
`git status` should show a clean (or nearly clean) tree, meaning your local files match
what's live. If a few untracked files show up (for example `.nojekyll` or this
`GIT_SETUP.md`), that's expected. You can include them with the routine below.

---

## 3. Everyday routine: publish an edit

After you change any file in the folder:
```bash
git add -A
git commit -m "Describe what you changed"
git push
```
Your site updates at https://sethwoodbury.github.io within about a minute.

**Before you start editing,** if changes might have been made on GitHub in the meantime
(for example by me), pull them first so you stay in sync:
```bash
git pull
```

---

## Handy extras

- See what changed but isn't committed yet: `git status`
- See a compact history: `git log --oneline -10`
- Undo edits to one file since the last commit: `git checkout -- path/to/file`
- Discard ALL uncommitted local changes (careful): `git reset --hard`

## Prefer no terminal at all?

Install **GitHub Desktop** (https://desktop.github.com), sign in once, and you can commit
and push with buttons instead of commands. Same result, no typing.

## Alternative sign-in: SSH key (optional, no token expiry)
```bash
ssh-keygen -t ed25519 -C "woodbuse@uw.edu"        # press Return through the prompts
pbcopy < ~/.ssh/id_ed25519.pub                     # copies the PUBLIC key
```
Then on GitHub: Settings → SSH and GPG keys → New SSH key → paste → Add. After that, use
the SSH remote once:
```bash
git remote set-url origin git@github.com:SethWoodbury/SethWoodbury.github.io.git
```
Only the public key ever leaves your machine; the private key stays put.
