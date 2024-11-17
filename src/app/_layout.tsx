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

SplashScreen.preventAutoHideAsync();

// SplashScreen.setOptions({
// 	fade: true,
// 	duration: 500,
// });

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
