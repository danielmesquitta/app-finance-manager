import ExpoSlider, { type SliderProps } from "@react-native-community/slider";
import { View } from "react-native";
import { Text } from "./text";
import { colors } from "@/styles";

export function Slider({
	value,
	minimumValue = 0,
	maximumValue = 100,
	...props
}: SliderProps) {
	return (
		<View>
			<ExpoSlider
				step={1}
				minimumValue={minimumValue}
				maximumValue={maximumValue}
				minimumTrackTintColor={colors.black}
				maximumTrackTintColor={colors.gray[100]}
				{...props}
			/>

			<View className="flex-row justify-between items-center">
				<Text className="text-xs text-gray-400">{minimumValue}%</Text>

				{value && (
					<Text className="text-xs text-black font-jakarta-600">{value}%</Text>
				)}

				<Text className="text-xs text-gray-400">{maximumValue}%</Text>
			</View>
		</View>
	);
}
