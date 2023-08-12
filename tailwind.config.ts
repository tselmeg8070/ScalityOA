import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
		fontFamily: {
			'bebas': ['Bebas Neue', 'sans-serif'],
		},
		colors: {
			lightCoral: '#EF6F6C',
			yinminBlue: '#465775',
			aquaMarine: '#56E39F',
			mint: '#59C9A5',
			feldgrau: '#5B6C5D',
		},
    },
  },
  plugins: [],
}
export default config
