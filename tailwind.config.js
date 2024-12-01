/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'monospace'],
				mono: ['Space Mono', 'monospace'],
				gothic: ['DotGothic16', 'sans-serif']
			},
			typography: {
				DEFAULT: {
					css: {
						a: {
							textDecoration: 'none',
							color: 'lime',
							'&:hover': {
								textDecoration: 'underline',
								color: '#90EE90'
							}
						}
					}
				}
			}
		}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')]
};
