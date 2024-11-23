import "@/styles/global.css";
import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import {
	useFonts,
	Inter_700Bold,
	Inter_500Medium,
	Inter_400Regular,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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
		Inter_700Bold,
		Inter_500Medium,
		Inter_400Regular,
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
				}}
			/>
		</GestureHandlerRootView>
	);
}
