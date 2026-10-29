import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

// /projects/mapox → /demos/mapox, etc.
export function load({ params }) {
	redirect(301, `${resolve('/demos')}/${params.path}`);
}
