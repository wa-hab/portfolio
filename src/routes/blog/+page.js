export async function load({ fetch }) {
	const posts = await fetch('/api/posts').then((res) => res.json());

	return {
		posts
	};
}
