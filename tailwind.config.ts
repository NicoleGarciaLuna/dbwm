import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: {
					"50": "#b5c3e1",
					"100": "#9fb2d7",
					"200": "#8aa1cd",
					"300": "#7590c3",
					"400": "#607fb9",
					"500": "#4b6eaf",
					"600": "#005da4", // Fuerte
					"700": "#004c8c",
					"800": "#003b74",
					"900": "#002a5c",
					"950": "#001944",
				},
				secondary: {
					"50": "#fdd7bb",
					"100": "#fccaa3",
					"200": "#fabe8b",
					"300": "#f8b273",
					"400": "#f6a65b",
					"500": "#f49a43",
					"600": "#f37021", // Fuerte
					"700": "#d1601c",
					"800": "#af5017",
					"900": "#8d4012",
					"950": "#6b300e",
				},
				terciary: {
					"50": "#cdecfc",
					"100": "#b8e4fa",
					"200": "#a4dcf8",
					"300": "#8fd4f6",
					"400": "#7bcdf4",
					"500": "#66c5f2",
					"600": "#00c0f3", // Fuerte
					"700": "#00a8d9",
					"800": "#0090bf",
					"900": "#0078a5",
					"950": "#00608b",
				},
			},
		},
		fontFamily: {
			body: [
				"Inter",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"system-ui",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
			sans: [
				"Inter",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"system-ui",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
		},
	},
	plugins: [],
};
export default config;
