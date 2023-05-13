/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
	],

	theme: {
		extend: {
      fontFamily : {
        "roboto" : ['Roboto', 'sans-serif'],
        'orbitron' : ['Orbitron', 'sans-serif']
      },
      colors : {
        'dark' : "#18191A",
        'light' : "#e4e6eb",
        'cyber-1' : '#b000ff',
        'cyber-2' : '#fd00ff',
        'cyber-3' : '#8900ff',
        'cyber-4' : '#ff0677',
        'cyber-5' : '#0051ff',
        'cyber-6' : '#f5eb31',
        'cyber-7' : '#148090'
      }
    }
	},
	plugins: [require('daisyui')]
};
