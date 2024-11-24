import { Platform, TouchableOpacity, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import {
	statusCodes,
	GoogleSignin,
	isErrorWithCode,
	isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoApple, LogoGoogle } from "@/assets/app";
import { Text } from "@/components";

export default function App() {
	async function handleAppleAuthentication() {
		await AppleAuthentication.signInAsync({
			requestedScopes: [
				AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
				AppleAuthentication.AppleAuthenticationScope.EMAIL,
			],
		})
			.then(async (credential) => {
				console.log({ credential });
			})
			.catch((err) => {
				if (err.code === "ERR_REQUEST_CANCELED") {
					// Handle that the user canceled the sign-in flow

					return;
				}

				// Handle other errors
			});
	}

	async function handleGoogleAuthentication() {
		try {
			await GoogleSignin.hasPlayServices();

			const response = await GoogleSignin.signIn();

			if (isSuccessResponse(response)) {
				console.log({ userInfo: response.data });

				return;
			}

			// Sign in was cancelled by user
		} catch (error) {
			if (isErrorWithCode(error)) {
				switch (error.code) {
					case statusCodes.IN_PROGRESS:
						// Operation (eg. sign in) already in progress
						break;
					case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
						// Android only, play services not available or outdated
						break;
					default:
					// Some other error happened
				}

				return;
			}

			// An error that's not related to google sign in occurred
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View className="flex-1 p-7">
				<Text className="text-gray-400">Bem-vindo ao Finance!</Text>

				<Text className="text-2xl font-jakarta-600 mt-2">
					Planejamento financeiro em um único lugar!
				</Text>

				<View className="rounded-xl bg-white my-12 flex-1" />

				<View className="gap-4">
					{Platform.OS === "ios" && (
						<TouchableOpacity
							onPress={handleAppleAuthentication}
							className="rounded-xl p-3 bg-black flex-row items-center justify-center gap-4 border border-solid border-black"
						>
							<Text className="text-white font-jakarta-600">
								Entrar com a Apple
							</Text>

							<LogoApple />
						</TouchableOpacity>
					)}

					<TouchableOpacity
						onPress={handleGoogleAuthentication}
						className="rounded-xl p-3 bg-white flex-row items-center justify-center gap-4 border border-solid border-gray-100"
					>
						<Text className="text-black font-jakarta-600">
							Entrar com a Google
						</Text>

						<LogoGoogle />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
