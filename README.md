# Seth M. Woodbury — personal website

A single stable landing page for your QR code. Point the QR at **https://sethwoodbury.github.io**
once and never change it again. Just edit these files as your work evolves.

```
sethwoodbury.github.io/
├── index.html              # Landing: hero, about, current research, work, earlier work, affiliations, contact
├── publications.html       # Full record: enzyme design + biomaterials, patent/IP, honors
├── media.html              # "In the Media" — only work you authored
├── theme.html              # Live theme playground (try colors, apply site-wide, export a theme)
├── 404.html                # Friendly not-found page
├── .nojekyll               # Serve files as-is
└── assets/
    ├── styles.css          # Structure (theme-agnostic)
    ├── themes.css          # THEME REGISTRY — 8 named palettes; add your own here
    ├── theme.js            # Applies saved/ custom themes across pages
    ├── app.js              # Molecular-canvas hero, photo fallback, interactions
    ├── profile.jpg         # Your headshot (already added)
    ├── qr-code.png         # Iridescent QR → sethwoodbury.github.io (used on the site)
    ├── qr-code-plain.png   # Plain high-contrast QR (maximum reliability)
    ├── qr-slide.png        # QR on a white tile, transparent corners (best for slides)
    ├── qr-card.png / .pdf  # Print-ready QR card for your conference table
    ├── Seth_Woodbury_CV.pdf# CV compiled from your LaTeX
    └── papers/             # Drop paper PDFs here (see papers/README.md for what you can host)
```

Your photo is already in place. Nothing else is required before publishing.

---

## Publish on GitHub Pages (free)

Your username is **SethWoodbury**, so the repo must be named exactly **`SethWoodbury.github.io`**,
served at **https://sethwoodbury.github.io**.

### Option A — No terminal (drag & drop)

1. Go to <https://github.com/new>.
2. Repository name: `SethWoodbury.github.io` (exactly). Make it **Public**. Create repository.
3. Click **uploading an existing file**.
4. Drag in **everything inside this folder**: all the `.html` files, `.nojekyll`, and the whole
   `assets/` folder (including `assets/papers/`). Commit.
5. **Settings → Pages** → Source: Deploy from a branch → Branch: **main** / **/(root)** → Save.
6. Wait about a minute, then open **https://sethwoodbury.github.io**.

### Option B — Terminal

From inside this folder run `./deploy.sh`, then do step 5 once. After that, `./deploy.sh` pushes
future edits live in seconds.

---

## Themes

- Eight palettes ship in `assets/themes.css` (Iridescent Jade is the default). Try them live at
  `theme.html`, then click **Apply across the site** to keep your pick on every page.
- **Add a theme:** copy any `[data-theme="..."]` block in `themes.css`, rename it, recolor the
  tokens. It shows up in the playground automatically (list lives in `assets/theme.js`).
- The playground can also **export** a custom palette as a ready-to-paste theme block.

## Paper PDFs

The "PDF" buttons on `publications.html` point at files in `assets/papers/`. See
`assets/papers/README.md` for the exact filenames and which papers you can legally self-host
(your open-access papers and preprints: yes; subscription-journal final PDFs: link the DOI or post
your accepted manuscript per the publisher's policy).

## Editing later

Plain HTML/CSS/JS, no build step. Colors are all tokens in `themes.css`; structure is in `styles.css`.
To add a publication, copy a `<div class="pub">` block. To add a media item, copy a
`<div class="media-item">` block. Author labels use `<span class="badge-role">Lead author</span>`
and `<span class="badge-role corr">Corresponding author</span>` (both can appear on one paper).
Push the changed files and the live site updates within a minute.
