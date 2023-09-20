// @ts-check
import { join } from "path"

// 1. Import the Skeleton plugin
import { skeleton } from "@skeletonlabs/tw-plugin"

/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: "class",
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		join(
			require.resolve("@skeletonlabs/skeleton"),
			"../**/*.{html,js,svelte,ts}"
		),
	],

	theme: {
		extend: {},
	},

	plugins: [skeleton({ themes: { preset: ["wintry"] } })],
}

module.exports = config
