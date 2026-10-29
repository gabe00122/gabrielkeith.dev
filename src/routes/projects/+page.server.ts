import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

// A prerendered redirect is a meta-refresh page; keep the real 301
export const prerender = false;

// Projects were folded into posts + demos; keep old links working
export function load() {
	redirect(301, resolve('/demos'));
}
