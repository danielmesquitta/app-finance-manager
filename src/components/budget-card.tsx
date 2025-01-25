import { View } from "react-native";
import { masks } from "@/utils";
import { Text } from "./ui/text";
import type { FC, PropsWithChildren } from "react";
import type { SvgProps } from "react-native-svg";

interface BarProps {
	color: string;
	percentage: number;
}

interface DetailsProps {
	icon: FC<SvgProps>;
	color: string;
	title: string;
	budget: number;
}

interface RemainingProps {
	spent: number;
	remaining: number;
}

function Bar({ percentage, color }: BarProps) {
	return (
		<View className="w-full h-1.5 flex-row items-center bg-gray-100 rounded-full">
			<View
				style={{
					width: `${percentage > 100 ? 100 : percentage}%`,
					backgroundColor: color,
				}}
				className="h-full rounded-full"
			/>
		</View>
	);
}

function Details({
	icon: Icon,
	title,
	color,
	budget,
	children,
}: PropsWithChildren<DetailsProps>) {
	return (
		<View className="flex-row items-center gap-3">
			<View className="p-2.5 rounded-xl border border-solid border-gray-50">
				<Icon color={color} width={24} height={24} />
			</View>

			<View className="gap-1">
				<Text className="font-jakarta-600 text-black">{title}</Text>

				<Text className="text-xs text-gray-400">
					Orçamento: {masks.currency(budget)}
				</Text>
			</View>

			{children}
		</View>
	);
}

function Remaining({ spent, remaining }: RemainingProps) {
	return (
		<View className="flex-row items-center justify-between gap-2">
			<Text className="text-xs text-gray-400">
				Gasto: {masks.currency(spent)}
			</Text>

			<Text className="text-xs text-gray-400">
				Restante: {masks.currency(remaining)}
			</Text>
		</View>
	);
}

export const BudgetCard = {
	Bar,
	Details,
	Remaining,
};
