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
		excludeRoutePatterns: [
			'^/dashboard.*', // i.e. routes starting with `/dashboard`
			'.*\\[page=integer\\].*', // i.e. routes containing `[page=integer]`–e.g. `/blog/2`
			'.*\\(authenticated\\).*' // i.e. routes within a group
		],
		paramValues: {
			// paramValues can be a 1D array of strings
			'/blog/[slug]': blogSlugs // e.g. ['hello-world', 'another-post']
		},
		defaultChangefreq: 'never',
		defaultPriority: 0.7,
		sort: 'alpha', // default is false; 'alpha' sorts all paths alphabetically.
		processPaths: (paths) => {
			return paths;
		}
	});
};
