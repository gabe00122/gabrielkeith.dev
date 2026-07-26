# My personal site and blog

Hosted here https://gabrielkeith.dev/

## Technology

- [SvelteKit](https://kit.svelte.dev/) (Svelte 5, runes) + TypeScript
- [mdsvex](https://mdsvex.pngwn.io/) — Markdown posts that can embed Svelte components
- [Pico CSS](https://picocss.com/) for base styling, with a dark/light theme toggle
- [Shiki](https://shiki.style/) (Dracula) for syntax highlighting
- KaTeX (via `remark-math` + `rehype-katex-svelte`) for math
- [TensorFlow.js](https://www.tensorflow.org/js) for the in-browser tic-tac-toe agent
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
  routes/
    posts/          Listing page + [slug] renderer + posts API endpoint
    projects/       Interactive demos (e.g. tictactoe)
  lib/
    components/     Reusable components for posts (image, video, collapse, ...)
    config.ts       Site title / description / URL
    theme.ts        Theme store, persisted to localStorage
static/
  blog/             Post media (images, videos, posters)
  tictactoe/        TF.js model weights
scripts/            Build-time helpers
```

## Writing a post

Add a Markdown file to `src/posts/`. The filename becomes the slug, so
`src/posts/latent-actions.md` is served at `/posts/latent-actions`. Posts are
discovered at build time with `import.meta.glob`, so a new file just shows up —
no index to update.

## License

This repository is dual-licensed:

- **Code** — everything except the content below — is under the
  [Apache License 2.0](LICENSE).
- **Content** — the blog posts in `src/posts/` and the images, videos, and other
  media in `static/` — is under
  [CC BY-NC 4.0](LICENSE-CONTENT) (attribution, non-commercial).

So: reuse the code however you like, and feel free to quote or share the posts
with credit. For commercial use of the writing, ask me first.
