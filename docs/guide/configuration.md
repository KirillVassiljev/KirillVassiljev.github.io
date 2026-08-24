# Configuration

Everything about the site lives in `mkdocs.yml`.

## Site metadata

```yaml
site_name: Kirill Vassiljev
site_description: A sample documentation site built with MkDocs and Material.
site_url: https://kirillvassiljev.github.io/
```

## Theme

The Material theme is configured with two colour palettes and a toggle:

```yaml
theme:
  name: material
  palette:
    - media: "(prefers-color-scheme: light)"
      scheme: default
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
```

Useful feature flags that are enabled:

| Flag | Effect |
| --- | --- |
| `navigation.tabs` | Top-level sections become tabs in the header |
| `navigation.top` | Adds a "back to top" button |
| `search.suggest` | Inline completion in the search box |
| `content.code.copy` | Copy button on code blocks |

## Markdown extensions

Admonitions, tabbed content, footnotes, and highlighted code are enabled through
`markdown_extensions`. For example, this note:

!!! note
    Written as `!!! note` followed by an indented paragraph.

## Custom styles

Extra CSS is loaded from `docs/stylesheets/extra.css`, wired up with:

```yaml
extra_css:
  - stylesheets/extra.css
```

## Deployment

`.github/workflows/deploy.yml` builds the site on every push to `main` and
publishes it with GitHub Pages. In **Settings → Pages**, set the source to
**GitHub Actions**.
