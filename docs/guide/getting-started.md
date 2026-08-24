# Getting started

## Requirements

- Python 3.9 or newer
- `pip` (or [uv](https://docs.astral.sh/uv/))

## Install

=== "uv"

    ```bash
    uv venv
    uv pip install -r requirements.txt
    ```

=== "pip"

    ```bash
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    ```

## Preview locally

```bash
mkdocs serve
```

The site is served at <http://127.0.0.1:8000> and reloads whenever you save a file.

## Build

```bash
mkdocs build --strict
```

The rendered site is written to `site/`, which is git-ignored.

!!! warning "Strict mode"
    `--strict` turns warnings such as broken internal links into errors. The CI
    workflow uses it, so run it before pushing.

## Add a page

1. Create a Markdown file under `docs/`, for example `docs/guide/faq.md`.
2. Add it to the `nav` section of `mkdocs.yml`:

    ```yaml
    nav:
      - Guide:
          - FAQ: guide/faq.md
    ```

3. Preview with `mkdocs serve`.
