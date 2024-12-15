import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";

export function Loading({ size = 20, ...props }: ActivityIndicatorProps) {
	return <ActivityIndicator {...props} size={size} />;
}
