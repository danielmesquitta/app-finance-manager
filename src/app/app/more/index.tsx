import { IconChevronRight } from "@/assets/app";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Text,
} from "@/components";
import { getUser } from "@/services";
import { colors } from "@/styles";
import { formatInitials } from "@/utils";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MorePage() {
	const user = getUser();

	if (!user) return null;

	return (
		<View className="flex-1 items-center">
			<View className="bg-white w-full py-7">
				<SafeAreaView className="items-center">
					<Avatar alt={user.name} className="size-16">
						<AvatarImage source={{ uri: user.avatar }} />
						<AvatarFallback>
							<Text className="text-white font-jakarta-600">
								{formatInitials(user.name)}
							</Text>
						</AvatarFallback>
					</Avatar>

					<Text className="mt-5 text-lg font-jakarta-600">{user.name}</Text>

					<Text className="text-xs text-gray-400">{user.email}</Text>

					<Button className="mt-7">
						<Text>Aprimore para o Plano PLUS+</Text>

						<IconChevronRight color={colors.white} opacity={0.5} />
					</Button>
				</SafeAreaView>
			</View>
		</View>
	);
}
