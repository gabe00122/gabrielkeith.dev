// All content is known at build time, so every page is built to static HTML.
// Routes that must stay dynamic (the /projects redirects) opt out.
export const prerender = true;
