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
import { Toasts } from "@backpackapp-io/react-native-toast";

GoogleSignin.configure({
	webClientId: `${process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID}.apps.googleusercontent.com`,
	iosClientId: `${process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID}.apps.googleusercontent.com`,
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

			<Toasts
				defaultStyle={{
					view: {
						borderRadius: 8,
					},
					indicator: {
						width: 12,
						height: 12,
					},
				}}
			/>
		</GestureHandlerRootView>
	);
}
