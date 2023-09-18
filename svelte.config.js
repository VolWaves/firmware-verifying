import adapter from "@sveltejs/adapter-auto"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
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
}

export default config
