import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import shiki from 'shiki';

const mdsvexOptions = {
	extensions: ['.md'],
	layout: './src/lib/components/MarkdownLayout.svelte',
	highlight: {
		highlighter: async (code, lang) => {
			const highlighter = await shiki.getHighlighter({
				theme: 'monokai'
			});
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)]
};

export default config;
