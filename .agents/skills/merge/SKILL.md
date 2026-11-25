---
name: merge
description: Land an explicitly approved personal-site change on main after the applicable SvelteKit checks.
disable-model-invocation: true
metadata:
  delta-action: land
---

# Merge into personal-site `main`

Invoking this skill authorizes landing the requested change, not unrelated work.

1. Inspect the diff and commit scope. Fetch GitHub `main` from `origin` and,
   if present, the primary checkout's `main` via Delta's `local` remote. Stop
   if they diverged or if landing would publish unrelated commits. Before
   pushing to `local`, verify it points to the intended checkout, on `main`
   and clean.
2. Commit only the requested files and rebase onto the newest base. Resolve
   clear conflicts; stop if the intended resolution is ambiguous. Keep history
   linear: no merge commits or force pushes.
3. For site code, content, assets, dependencies, or build configuration, run
   `npm ci`, `npm run check`, `npm run lint`, and `npm run build` from the
   repository root. These scripts are defined in `package.json`. For changes
   only to repo documentation or agent instructions, check the diff and
   validate any skill frontmatter instead. Stop if any applicable check fails.
4. Recheck both destinations. If either advanced, update the base and rerun the
   checks. Fast-forward the primary checkout via `local` if applicable, then
   push the checked commit to `origin`'s `main`. Verify both destinations and
   report the commit, checks, and any partial landing.
