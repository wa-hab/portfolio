import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import hljs from 'highlight.js';


const mdsvexOptions = {
	extensions: ['.md'],
	layout: './src/lib/components/MarkdownLayout.svelte',
	highlight: {
		highlighter: (code, lang) => {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			const html = hljs.highlight(code, {
				language,
			}).value;
			return `<Components.pre class="language-${lang}">{@html \`<code class="language-${lang}">${html}</code>\`}</Components.pre>`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter()
	},
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)]
};

export default config;
