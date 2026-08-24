# KirillVassiljev.github.io

Personal site built with [MkDocs](https://www.mkdocs.org/) and the
[Material](https://squidfunk.github.io/mkdocs-material/) theme, deployed to
GitHub Pages by GitHub Actions.

## Local development

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Then open <http://127.0.0.1:8000>.

## Build

```bash
mkdocs build --strict
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`.
Set **Settings → Pages → Source** to **GitHub Actions** once.
