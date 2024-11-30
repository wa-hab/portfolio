import * as sitemap from 'super-sitemap';
import { getPosts } from '$lib/utils';

export const prerender = true; // optional

export const GET = async () => {
	// Get data for parameterized routes however you need to; this is only an example.
	let blogSlugs;
	try {
		const posts = await getPosts();
		blogSlugs = posts.map((post) => post.slug);
	} catch (err) {
		throw new Error('Could not load data for param values.');
	}

	return await sitemap.response({
		origin: 'https://wahab.vercel.app',
		paramValues: {
			'/blog/[slug]': blogSlugs // e.g. ['hello-world', 'another-post']
		},
		defaultChangefreq: 'never',
		defaultPriority: 0.7,
		sort: 'alpha',
		processPaths: (paths) => {
			return paths;
		}
	});
};
