import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

// A prerendered redirect is a meta-refresh page; keep the real 301
export const prerender = false;

// /projects/mapox → /demos/mapox, etc.
export function load({ params }) {
	redirect(301, `${resolve('/demos')}/${params.path}`);
}
