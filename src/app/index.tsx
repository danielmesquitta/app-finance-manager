import { LogoApple, LogoGoogle } from "@/assets/app";
import { Loading, Text } from "@/components";
import { auth } from "@/contracts";
import { getItem, setAuthSession, StorageKey } from "@/services";
import { delay } from "@/utils";
import { toast } from "@backpackapp-io/react-native-toast";
import {
	GoogleSignin,
	isErrorWithCode,
	isSuccessResponse,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	const [isLoading, setIsLoading] = useState(false);

	const { replace } = useRouter();

	useEffect(() => {
		async function run() {
			await delay(1000);

			const session = getItem({ key: StorageKey.TOKEN });

			if (session) replace("/app");
		}

		run();
	}, [replace]);

	async function handleAppleAuthentication() {
		setIsLoading(true);

		await AppleAuthentication.signInAsync({
			requestedScopes: [
				AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
				AppleAuthentication.AppleAuthenticationScope.EMAIL,
			],
		})
			.then(async (credential) => {
				const { data } = await auth({
					token: credential.identityToken as string,
					provider: "APPLE",
				});

				setAuthSession({
					user: data.user,
					accessToken: data.access_token,
					refreshToken: data.refresh_token,
				});

				replace("/app");
			})
			.catch((err) => {
				if (err.code === "ERR_REQUEST_CANCELED") return;

				toast.error(err.message || "Ocorreu um erro ao autenticar");
			})
			.finally(() => setIsLoading(false));
	}

	async function handleGoogleAuthentication() {
		try {
			await GoogleSignin.hasPlayServices();

			const response = await GoogleSignin.signIn();

			if (!isSuccessResponse(response)) return;

			setIsLoading(true);

			const tokens = await GoogleSignin.getTokens();

			await auth({
				token: tokens.accessToken,
				provider: "GOOGLE",
			})
				.then(({ data }) => {
					setAuthSession({
						user: data.user,
						accessToken: data.access_token,
						refreshToken: data.refresh_token,
					});

					replace("/app");
				})
				.catch((err) =>
					toast.error(err.message || "Ocorreu um erro ao autenticar"),
				)
				.finally(() => setIsLoading(false));
		} catch (error) {
			if (isErrorWithCode(error)) {
				switch (error.code) {
					case statusCodes.IN_PROGRESS:
						toast.error("Autenticação em andamento");

						break;
					case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
						toast.error("Serviços da Google não disponíveis");

						break;
					default:
						break;
				}

				const err = error as Error;

				toast.error(err.message || "Ocorreu um erro ao autenticar");
			}
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View className="flex-1">
				{isLoading && (
					<View className="size-full z-10 items-center justify-center absolute bg-white/50">
						<Loading size="small" className="text-gray-900" />
					</View>
				)}

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
			</View>
		</SafeAreaView>
	);
}
