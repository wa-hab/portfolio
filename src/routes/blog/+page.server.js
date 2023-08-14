import { error } from '@sveltejs/kit';
import pb from "$lib/pocketbase.js"

export async function load() {
    const posts = await pb.collection('posts').getFullList({
		fields: ['title', 'created'],
        sort: '-created',
    });

	if (posts) {
		return {
			posts: posts.map((post) => post.export())
		};
	}

	throw error(404, 'Not Found');
}

export const ssr = true;
