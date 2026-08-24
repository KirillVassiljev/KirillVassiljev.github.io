# KirillVassiljev.github.io

A minimal static site: plain HTML, CSS, and JavaScript. No build step.

- `index.html` — page markup
- `styles.css` — styling
- `script.js` — button behaviour

## Local development

```bash
python3 -m http.server
```

Then open <http://localhost:8000>. Opening `index.html` directly in a browser
works too.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the
repository root to GitHub Pages.
