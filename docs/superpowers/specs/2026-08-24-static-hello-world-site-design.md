# Static Hello World Site — Design

Date: 2026-08-24

## Goal

Replace the MkDocs Material sample site with a minimal static site written in
plain HTML, CSS, and JavaScript: a "Hello, world!" page with a button that
shows a browser alert.

## Non-goals

- No build step, no framework, no package manager.
- No portfolio content (projects, bio, social links). Those can come later.
- No custom domain (the `CNAME` file was already removed in history).

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page markup: `<h1>Hello, world!</h1>` and `<button id="alert-btn">`. Links `styles.css` and defers `script.js`. |
| `styles.css` | Minimal styling: centered flex layout, system font stack, light/dark via `prefers-color-scheme`, button styling with hover and focus-visible states. |
| `script.js` | Attaches a `click` listener to `#alert-btn` that calls `alert("Hello, world!")`. No inline JS in the HTML. |
| `.github/workflows/deploy.yml` | Rewritten: no build, uploads the repo root as the Pages artifact and deploys it. |
| `README.md` | Short note: open `index.html` locally; pushes to `main` deploy. |
| `.gitignore` | Reduced to `.DS_Store`; MkDocs-specific entries removed. |

## Removed

`docs/index.md`, `docs/about.md`, `docs/guide/`, `docs/stylesheets/`, `site/`,
`mkdocs.yml`, `requirements.txt`.

`docs/superpowers/specs/` is kept — it holds this document, not site content.

## Deployment

Pages source stays on **GitHub Actions**, so no repository settings change is
needed. The workflow keeps the existing `pages: write` / `id-token: write`
permissions and the `pages` concurrency group, drops the Python setup and
`mkdocs build` steps, and points `actions/upload-pages-artifact` at `.` instead
of `site`.

Uploading the repo root means `.github/` and `docs/` are included in the
artifact. That is acceptable: these are already public in the repository, and
avoiding it would require a copy step that adds more complexity than it saves.

## Behavior and error handling

The page has one interaction. `script.js` runs with `defer`, so `#alert-btn`
exists when the listener is attached. If JavaScript is disabled the page still
renders and the button simply does nothing — acceptable for a demo page.

## Verification

- Serve the directory locally (`python3 -m http.server`) and confirm the page
  renders and the button triggers the alert.
- Confirm `git status` shows the MkDocs files deleted and the three new site
  files added.
- Confirm the Actions run succeeds after pushing to `main` and the published
  site shows the new page.
