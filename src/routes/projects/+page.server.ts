import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

// Projects were folded into posts + demos; keep old links working
export function load() {
	redirect(301, resolve('/demos'));
}
