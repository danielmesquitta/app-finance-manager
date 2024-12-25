import { IconChevronRight } from "@/assets/app";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui";
import { colors } from "@/styles";
import { useRouter } from "expo-router";
import { useSafeArea } from "@/hooks";

interface HeadNavigationProps {
	title: string;
}

export function HeadNavigation({ title }: HeadNavigationProps) {
	const { back } = useRouter();

	const { top } = useSafeArea();

	return (
		<View
			style={{ paddingTop: top + 16 }}
			className="flex-row items-center justify-between bg-white pb-5 px-7"
		>
			<TouchableOpacity onPress={back} className="p-1.5 bg-gray-50 rounded-2xl">
				<IconChevronRight
					width={20}
					color={colors.gray[400]}
					style={{ transform: [{ rotate: "180deg" }] }}
				/>
			</TouchableOpacity>

			<Text className="font-jakarta-600">{title}</Text>

			<View className="size-9" />
		</View>
	);
}
