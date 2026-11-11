# My personal site and blog

Hosted here https://gabrielkeith.dev/

## Technology

- [SvelteKit](https://kit.svelte.dev/) (Svelte 5, runes) + TypeScript
- [mdsvex](https://mdsvex.pngwn.io/) — Markdown posts that can embed Svelte components
- Hand-written CSS in `src/app.css` (dark only, palette sampled from the Mapox tileset)
- [Shiki](https://shiki.style/) (Dracula) for syntax highlighting
- KaTeX (via `remark-math` + `rehype-katex-svelte`) for math
- [TensorFlow.js](https://www.tensorflow.org/js) for the in-browser tic-tac-toe agent
- A Rust/WebAssembly + WebGPU build of [Mapox](https://github.com/gabe00122/mapox) for the gridworld demo
- Deployed to Cloudflare (`@sveltejs/adapter-cloudflare`)

## Running it

Requires Node 20+ (developed on 24) and `ffmpeg` if you want to regenerate video posters.

```bash
npm install
npm run dev        # dev server at http://localhost:5173
```

Other scripts:

| Command           | What it does                                                                   |
| ----------------- | ------------------------------------------------------------------------------ |
| `npm run build`   | Production build                                                               |
| `npm run preview` | Serve the production build locally                                             |
| `npm run check`   | `svelte-check` type/diagnostics pass                                           |
| `npm run lint`    | Prettier check + ESLint                                                        |
| `npm run format`  | Prettier write                                                                 |
| `npm run posters` | Generate `-poster.webp` thumbnails for every video in `static/` (needs ffmpeg) |

## Layout

```
src/
  posts/            Blog posts (.md, processed by mdsvex)
  notes/            Raw notes and drafts; not built or served
  routes/
    posts/          Listing page + [slug] renderer
    demos/          Interactive demos (mapox, tictactoe)
    projects/       Redirects from the old /projects URLs to /demos
    rss.xml/        RSS feed of published posts
    sitemap.xml/    Sitemap
  lib/
    components/     Reusable components (post lists, image, video, SEO tags, ...)
    posts.ts        Collects published posts at build time
    demos.ts        Demo registry (name, route, repo, related posts)
    config.ts       Site title / description / URL
  app.css           Base stylesheet and design tokens
static/
  blog/             Post media (images, videos, posters)
  mapox/            Mapox wasm build + policy weights
  tictactoe/        TF.js model weights
scripts/            Build-time helpers
```

## Writing a post

Add a Markdown file to `src/posts/`. The filename becomes the slug, so
`src/posts/latent-actions.md` is served at `/posts/latent-actions`. Posts are
discovered at build time with `import.meta.glob`, so a new file just shows up —
no index to update.

Frontmatter:

```yaml
---
title: Memory and Implicit Communication
description: One line, shown in post lists, the RSS feed and link previews
date: '2026-04-09'
published: true # false keeps it out of the lists, feed and sitemap
code: # optional: repo links in the post header
  - https://github.com/gabe00122/mapox
demo: mapox # optional: a key from src/lib/demos.ts
---
```

The page renders the title as its `<h1>`, so start the post body at `##`.

Everything in `src/posts/` is bundled and shipped to the browser, published or
not. Keep notes that aren't meant to be public in `src/notes/`.

## License

This repository is dual-licensed:

- **Code** — everything except the content below — is under the
  [Apache License 2.0](LICENSE).
- **Content** — the blog posts in `src/posts/` and the images, videos, and other
  media in `static/` — is under
  [CC BY-NC 4.0](LICENSE-CONTENT) (attribution, non-commercial).

So: reuse the code however you like, and feel free to quote or share the posts
with credit. For commercial use of the writing, ask me first.
