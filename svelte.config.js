import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex} from 'mdsvex';
import Prism from 'prismjs';

const mdsvexOptions = {
	extensions: ['.md'],
	layout: './src/lib/components/MarkdownLayout.svelte',
	highlight: {
		highlighter: (code, lang) => {
			if (lang && Prism.languages[lang]) {
				const parsed = Prism.highlight(code, Prism.languages[lang]);
				const escaped = parsed.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
				const langTag = 'language-' + lang;
				// This thing below ↓↓↓↓
				return `<Components.pre class=${langTag}><code class=${langTag}>${escaped}</code></Components.pre>`;
			} else {
				const escaped = code.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
				return `<Components.pre><code>${escaped}</code></Components.pre>`;
			}
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
