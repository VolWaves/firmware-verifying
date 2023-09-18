import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import WindiCSS from "vite-plugin-windicss"

export default defineConfig({
	plugins: [WindiCSS(), sveltekit(), VitePWA({})],
})
