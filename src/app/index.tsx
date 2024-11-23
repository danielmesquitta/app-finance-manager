import { Text, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import {
	statusCodes,
	GoogleSignin,
	isErrorWithCode,
	isSuccessResponse,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

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
		<View className="flex-1 items-center justify-center">
			<Text>Hello World</Text>

			<AppleAuthentication.AppleAuthenticationButton
				style={{
					width: 200,
					height: 44,
				}}
				onPress={handleAppleAuthentication}
				buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
				buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
				cornerRadius={8}
			/>

			<GoogleSigninButton
				size={GoogleSigninButton.Size.Standard}
				color={GoogleSigninButton.Color.Light}
				onPress={handleGoogleAuthentication}
				// disabled={isInProgress}
			/>
		</View>
	);
}
