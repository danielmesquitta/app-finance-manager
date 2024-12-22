import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useSafeArea() {
	const { bottom, ...rest } = useSafeAreaInsets();

	return {
		...rest,
		bottom: bottom + (Platform.OS === "android" ? 16 : 0),
	};
}
