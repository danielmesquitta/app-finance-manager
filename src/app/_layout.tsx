import "@/styles/global.css";
import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import {
	useFonts,
	PlusJakartaSans_700Bold,
	PlusJakartaSans_500Medium,
	PlusJakartaSans_400Regular,
	PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { colors } from "@/styles";

GoogleSignin.configure({
	webClientId:
		"539040936256-a8hnr7gpfvp71fqp63v9hshnq6sgicaa.apps.googleusercontent.com",
	iosClientId:
		"539040936256-mes5nkg0pesarhr5kqbogn4t9t58pvs0.apps.googleusercontent.com",
	offlineAccess: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		PlusJakartaSans_700Bold,
		PlusJakartaSans_500Medium,
		PlusJakartaSans_400Regular,
		PlusJakartaSans_600SemiBold,
	});

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	if (!loaded) return null;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: colors.gray[50],
					},
				}}
			/>
		</GestureHandlerRootView>
	);
}
