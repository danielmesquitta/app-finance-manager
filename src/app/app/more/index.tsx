import {
	IconBell,
	IconCalculator,
	IconChevronRight,
	IconFileDescription,
	IconLogout2,
	IconMessageStar,
	IconNotes,
	IconSmartHome,
	IconUserSquare,
} from "@/assets/app";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
	Text,
	DialogFooter,
	DialogClose,
} from "@/components";
import { useSafeArea } from "@/hooks";
import { clearAuthSession, getUser } from "@/services";
import { colors } from "@/styles";
import { formatInitials } from "@/utils";
import { Link, useRouter, type RelativePathString } from "expo-router";
import type { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { SvgProps } from "react-native-svg";

type CardOption = {
	icon: FC<SvgProps>;
	label: string;
	route: string;
};

interface CardProps {
	title: string;
	options: CardOption[];
}

const routes = {
	help: [
		{
			icon: IconMessageStar,
			label: "Feedbacks",
			route: "/app/more/feedbacks",
		},
		{
			icon: IconNotes,
			label: "Políticas de privacidade",
			route: "/app/more/privacy-policies",
		},
		{
			icon: IconFileDescription,
			label: "Termos de uso",
			route: "/app/more/terms-of-use",
		},
	],
	tools: [
		{
			icon: IconCalculator,
			label: "Calculadoras",
			route: "/app/more/calculators",
		},
		{
			icon: IconSmartHome,
			label: "Chat",
			route: "/app/more/chat",
		},
	],
	preferences: [
		{
			icon: IconUserSquare,
			label: "Meu perfil",
			route: "/app/more/profile",
		},
		{
			icon: IconBell,
			label: "Notificações",
			route: "/app/more/notifications",
		},
	],
};

function Card({ title, options }: CardProps) {
	return (
		<View className="bg-white p-4 rounded-xl">
			<Text className="text-xs text-gray-400 font-jakarta-500 mb-4">
				{title}
			</Text>

			{options.map(({ icon: Icon, label, route }, index) => (
				<View key={label}>
					{index > 0 && <View className="h-px my-4 bg-gray-50 w-full" />}

					<Link href={route as RelativePathString}>
						<View className="flex-row items-center gap-4 w-full">
							<View className="p-1.5 bg-gray-50 rounded-xl">
								<Icon color={colors.gray[400]} />
							</View>

							<Text className="text-sm font-jakarta-500">{label}</Text>

							<IconChevronRight
								color={colors.gray[400]}
								width={16}
								style={{ marginLeft: "auto" }}
							/>
						</View>
					</Link>
				</View>
			))}
		</View>
	);
}

export default function MorePage() {
	const user = getUser();

	const { replace } = useRouter();

	const { top } = useSafeArea();

	if (!user) return null;

	async function handleLogout() {
		clearAuthSession();

		replace("/");
	}

	return (
		<View className="flex-1 items-center">
			<View
				style={{ paddingTop: top + 28 }}
				className="bg-white w-full pb-7 items-center"
			>
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
			</View>

			<ScrollView className="flex-1 w-full">
				<View className="flex-1 p-7 gap-7">
					<Card title="Ferramentas" options={routes.tools} />

					<Card title="Preferências" options={routes.preferences} />

					<Card title="Ajuda" options={routes.help} />

					<Dialog>
						<DialogTrigger asChild>
							<TouchableOpacity className="flex-row items-center gap-4 w-full bg-white p-4 rounded-xl">
								<View className="p-1.5 bg-gray-50 rounded-xl">
									<IconLogout2
										color={colors.gray[400]}
										width={24}
										height={24}
									/>
								</View>

								<Text className="text-sm font-jakarta-500">Sair</Text>

								<IconChevronRight
									color={colors.gray[400]}
									width={16}
									style={{ marginLeft: "auto" }}
								/>
							</TouchableOpacity>
						</DialogTrigger>

						<DialogContent isBottomSheet>
							<DialogHeader>
								<DialogTitle>Sair da conta</DialogTitle>
							</DialogHeader>

							<View className="items-center p-6">
								<View className="size-20 rounded-full bg-primary-500 items-center justify-center">
									<View className="size-16 rounded-full border-4 border-solid border-white/20 items-center justify-center">
										<IconLogout2 color={colors.white} width={24} height={24} />
									</View>
								</View>

								<Text className="text-xl font-jakarta-600 mt-7 mb-2 text-center">
									Deseja sair da sua conta?
								</Text>

								<Text className="text-sm text-gray-500 max-w-[200px] text-center">
									Se você sair da conta, você terá que fazer login novamente.
								</Text>
							</View>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="gray">
										<Text>Cancelar</Text>
									</Button>
								</DialogClose>

								<Button variant="black" onPress={handleLogout}>
									<Text>Sair da conta</Text>
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</View>
			</ScrollView>
		</View>
	);
}
