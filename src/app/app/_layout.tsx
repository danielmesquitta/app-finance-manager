import {
	IconChartBar,
	IconChartBarActive,
	IconCoins,
	IconCoinsActive,
	IconCreditCardPay,
	IconCreditCardPayActive,
	IconDotsCircleHorizontal,
	IconDotsCircleHorizontalActive,
	IconSmartHome,
	IconSmartHomeActive,
} from "@/assets/app";
import { Text } from "@/components";
import { colors } from "@/styles";
import {
	Tabs as ExpoRouterTabs,
	TabList,
	TabTrigger,
	TabSlot,
	type TabTriggerSlotProps,
} from "expo-router/ui";
import { forwardRef, type Ref, type FC } from "react";
import { Pressable, View } from "react-native";
import type { SvgProps } from "react-native-svg";

interface TabButtonProps extends TabTriggerSlotProps {
	icon: FC<SvgProps>;
	label: string;
	activeIcon: FC<SvgProps>;
}

const TabButton = forwardRef(
	(
		{
			icon: Icon,
			label,
			isFocused,
			activeIcon: ActiveIcon,
			...rest
		}: TabButtonProps,
		ref: Ref<View>,
	) => {
		return (
			<Pressable {...rest} ref={ref}>
				<View className="px-4 py-3 items-center gap-1">
					{isFocused ? <ActiveIcon /> : <Icon color={colors.gray[400]} />}
					<Text className="text-xs text-gray-400">{label}</Text>
				</View>
			</Pressable>
		);
	},
);

export default function Layout() {
	return (
		<ExpoRouterTabs>
			<TabSlot />

			<TabList className="bg-white pt-2 pb-4 px-6 rounded-t-lg">
				<TabTrigger name="index" href="/app" asChild>
					<TabButton
						icon={IconSmartHome}
						label="Início"
						activeIcon={IconSmartHomeActive}
					/>
				</TabTrigger>

				<TabTrigger name="transactions" href="/app/transactions" asChild>
					<TabButton
						icon={IconCreditCardPay}
						label="Transações"
						activeIcon={IconCreditCardPayActive}
					/>
				</TabTrigger>

				<TabTrigger name="investments" href="/app/investments" asChild>
					<TabButton
						icon={IconChartBar}
						label="Invest."
						activeIcon={IconChartBarActive}
					/>
				</TabTrigger>

				<TabTrigger name="budget" href="/app/budget" asChild>
					<TabButton
						icon={IconCoins}
						label="Orçam."
						activeIcon={IconCoinsActive}
					/>
				</TabTrigger>

				<TabTrigger name="more" href="/app/more" asChild>
					<TabButton
						icon={IconDotsCircleHorizontal}
						label="Mais"
						activeIcon={IconDotsCircleHorizontalActive}
					/>
				</TabTrigger>
			</TabList>
		</ExpoRouterTabs>
	);
}
