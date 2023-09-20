import { vitePreprocess } from "@sveltejs/kit/vite"
import adapter from "@sveltejs/adapter-static"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: "build",
			assets: "build",
			fallback: 'index.html',
			precompress: false,
			strict: true,
		}),
	},

	workbox: {
		globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
	},

	registerType: "autoUpdate",

	manifest: {
		background_color: "#ffffff",
		theme_color: "#7E1F86",
		name: "Verify",
		short_name: "Verify",
		start_url: "/",
		display: "standalone",
		icons: [
			{
				src: "/favicon.png",
				sizes: "1000x1000",
				type: "image/png",
				purpose: "maskable any",
			},
		],
	},

	preprocess: [vitePreprocess({})],
}

export default config
