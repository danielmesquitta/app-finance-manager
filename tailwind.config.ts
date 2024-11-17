import { colors } from "./src/styles";
import type { Config } from "tailwindcss";

export default {
	theme: {
		extend: {
			colors,

			fontFamily: {
				"inter-400": ["Inter_400Regular"],
				"inter-500": ["Inter_500Medium"],
				"inter-700": ["Inter_700Bold"],
			},
		},
	},

	presets: [require("nativewind/preset")],

	content: [
		"src/app/*.tsx",
		"src/app/**/*.tsx",
		"src/layouts/*.tsx",
		"src/layouts/**/*.tsx",
		"src/components/*.tsx",
		"src/components/**/*.tsx",
	],

	plugins: [],
} satisfies Config;
