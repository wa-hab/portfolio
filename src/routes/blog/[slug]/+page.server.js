import { error } from '@sveltejs/kit';
import pb from "$lib/pocketbase.js"

export async function load({ params }) {
	const { slug } = params;

	const post = await pb.collection("posts").getOne(slug)

	if (post) {
		return {
			post: post.export()
		};
	}

	throw error(404, 'Not Found');
}

export const ssr = true;
