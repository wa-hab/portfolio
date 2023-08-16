import { json } from '@sveltejs/kit';

async function getPosts() {
	let posts = [];

	const paths = import.meta.glob('/src/posts/*.md', {
		eager: true
	});

	for (const path in paths) {
		const post = await paths[path];
		const slug = path.split('/').at(-1).replace('.md', '');
		const metadata = post.metadata;
		metadata.published &&
			posts.push({
				slug,
				...metadata
			});
	}

	//sort posts by date
	posts = posts.sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
