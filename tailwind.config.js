/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

const constants = {
  green: "#107E52",
  "light-green": "#E8F2EF",
  brown: "#5D5854",
  grey: "#EAE9E5",
  red: "#DF4E47",
  'light-brown': '#A29B90',
  black:"#222222"
}


module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			transparent: colors.transparent,
			...constants,
		},
		screens: {
			tablet: '640px',
			laptop: '1024px',
			desktop: '1280px',
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
}
