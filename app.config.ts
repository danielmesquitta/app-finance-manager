import type { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	ios: {
		supportsTablet: true,
		usesAppleSignIn: true,
		bundleIdentifier: "br.com.finances",
	},
	name: "Finances",
	slug: "finances",
	icon: "./src/assets/icon.png",
	scheme: "finances",
	splash: {
		image: "./src/assets/splash-icon.png",
		resizeMode: "contain",
		backgroundColor: "#FFFFFF",
	},
	version: "1.0.0",
	plugins: [
		"expo-router",
		"react-native-bottom-tabs",
		"expo-apple-authentication",
		[
			"expo-splash-screen",
			{
				image: "./src/assets/splash-icon.png",
				imageWidth: 200,
				resizeMode: "contain",
			},
		],
		[
			"expo-build-properties",
			{
				ios: {
					useFrameworks: "static",
				},
			},
		],
		[
			"react-native-edge-to-edge",
			{
				android: {
					parentTheme: "Material3",
				},
			},
		],
		[
			"@react-native-google-signin/google-signin",
			{
				iosUrlScheme: `com.googleusercontent.apps.${process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID}`,
			},
		],
	],
	android: {
		package: "br.com.finances",
		adaptiveIcon: {
			foregroundImage: "./src/assets/adaptive-icon.png",
			backgroundColor: "#FFFFFF",
		},
	},
	experiments: {
		typedRoutes: true,
	},
	orientation: "portrait",
	newArchEnabled: true,
	androidStatusBar: {
		translucent: true,
	},
	userInterfaceStyle: "light",
});
