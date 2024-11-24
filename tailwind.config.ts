import { colors } from "./src/styles";
import type { Config } from "tailwindcss";

export default {
	theme: {
		extend: {
			colors,

			fontFamily: {
				"jakarta-400": ["PlusJakartaSans_400Regular"],
				"jakarta-500": ["PlusJakartaSans_500Medium"],
				"jakarta-600": ["PlusJakartaSans_600SemiBold"],
				"jakarta-700": ["PlusJakartaSans_700Bold"],
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
