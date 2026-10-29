import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export async function GET() {
	return json(getPosts());
}
