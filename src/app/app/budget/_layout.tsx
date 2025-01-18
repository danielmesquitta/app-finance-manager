import { colors } from "@/styles";
import { Stack } from "expo-router";

export default function MoreLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: colors.gray[50],
				},
			}}
		/>
	);
}
