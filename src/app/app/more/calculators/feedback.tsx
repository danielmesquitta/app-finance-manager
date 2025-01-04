import {
	CalculatorFeedbackBackground,
	IconArrowNarrowRight,
	IconFriends,
	IconHelpCircle,
	IconOld,
	IconTargetArrow,
	IconWallet,
} from "@/assets/app";
import { Text, Button } from "@/components";
import { getUser } from "@/services";
import { useCalculatorStore } from "@/store";
import { colors } from "@/styles";
import { cn, masks } from "@/utils";
import { useRouter } from "expo-router";
import { useMemo, type FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { SvgProps } from "react-native-svg";

interface FeedbackItemProps {
	icon: FC<SvgProps>;
	type?: "RED" | "GRAY" | "GREEN";
	title: string;
	value: string;
}

function FeedbackItem({
	icon: Icon,
	type = "GRAY",
	title,
	value,
}: FeedbackItemProps) {
	const iconColor = {
		RED: colors.red[500],
		GRAY: colors.gray[400],
		GREEN: colors.green[500],
	};

	return (
		<View className="flex-row items-center gap-4">
			<View
				className={cn(
					"p-2 rounded-lg border border-solid",
					type === "RED" && "bg-red-500/5 border-red-500/10",
					type === "GRAY" && "bg-gray-50 border-gray-50",
					type === "GREEN" && "bg-green-500/5 border-green-500/10",
				)}
			>
				<Icon width={24} color={iconColor[type]} />
			</View>

			<View className="gap-1">
				<Text className="text-xs text-gray-400">{title}</Text>
				<Text
					className={cn(
						"text-black font-jakarta-600",
						type !== "GREEN" && "text-sm",
					)}
				>
					{value}
				</Text>
			</View>

			{type !== "GREEN" && (
				<TouchableOpacity className="p-1.5 rounded-lg border border-solid border-gray-100 ml-auto">
					<IconHelpCircle width={16} color={colors.gray[500]} />
				</TouchableOpacity>
			)}
		</View>
	);
}

function FeedbackHeader() {
	const user = getUser();

	const { type, data } = useCalculatorStore();

	if (!user) return null;

	return (
		<View className="px-8">
			{type === "RETIREMENT" && (
				<Text className="text-center text-xl font-jakarta-600 text-gray-500">
					<Text className="text-black text-xl font-jakarta-600">
						Parabéns {user.name.split(" ")[0]}!
					</Text>{" "}
					Você atingiu sua meta de aposentadoria com os investimentos atuais.
				</Text>
			)}

			{type === "EMERGENCY_RESERVE" && (
				<>
					<Text className="text-center text-xs text-gray-400">
						Reserva financeira
					</Text>

					<Text className="text-xl mt-1 text-center font-jakarta-600 text-black">
						{masks.currency(data.recommended_reserve_in_value)}
					</Text>
				</>
			)}
		</View>
	);
}

export default function Feedback() {
	const { push, back } = useRouter();

	const { type, data } = useCalculatorStore();

	console.log({ data });

	const resultFields = useMemo(() => {
		if (type === "RETIREMENT") {
			return {
				title: "Resultados",
				fields: [
					{
						icon: IconOld,
						value: masks.currency(data.max_monthly_expenses),
						title: "Você poderá gastar por mês:",
					},
					{
						icon: IconFriends,
						type: data.heritage > 0 ? "GRAY" : "RED",
						value:
							data.heritage > 0
								? masks.currency(data.heritage)
								: "Não haverá herança",
						title: "Deixará de herança:",
					},
					{
						icon: IconTargetArrow,
						value: masks.currency(
							data.exceeded_goal_amount > 0 ? data.exceeded_goal_amount : 0,
						),
						title: "Você ultrapassou da sua meta:",
					},
				] satisfies FeedbackItemProps[],
			};
		}

		if (type === "EMERGENCY_RESERVE") {
			return {
				title: "Para isso, você precisará seguir o plano abaixo:",
				fields: [
					{
						icon: IconWallet,
						value: masks.currency(data.monthly_income),
						title: "Salário:",
					},
					{
						icon: IconWallet,
						value: masks.currency(data.monthly_expenses),
						title: "Custo fixo:",
					},
					{
						icon: IconWallet,
						value: `${data.monthly_savings_percentage}%`,
						title: "Poupança mensal:",
					},
					{
						icon: IconWallet,
						value: `${data.recommended_reserve_in_months} meses`,
						title: "Período de reserva recomendado:",
					},
				] satisfies FeedbackItemProps[],
			};
		}

		return {
			title: null,
			fields: [],
		};
	}, [data, type]);

	return (
		<View className="flex-1">
			<ScrollView className="flex-1">
				<CalculatorFeedbackBackground style={{ position: "absolute" }} />

				<View className="flex-1 px-7 pb-7 pt-64 gap-7">
					<FeedbackHeader />

					{type === "RETIREMENT" && (
						<View className="bg-white p-4 rounded-xl">
							<FeedbackItem
								icon={IconWallet}
								type="GREEN"
								title="Você se aposentará com:"
								value={masks.currency(data.property_on_retirement)}
							/>
						</View>
					)}

					<View className="bg-white p-4 rounded-xl">
						{resultFields.title && (
							<Text className="text-xs text-gray-400 font-jakarta-500 mb-5">
								{resultFields.title}
							</Text>
						)}

						{resultFields.fields.map((field, index) => (
							<View key={field.title}>
								{index !== 0 && (
									<View className="h-px bg-gray-50 w-full my-5" />
								)}

								<FeedbackItem {...field} />
							</View>
						))}
					</View>
				</View>
			</ScrollView>

			<View className="flex-row justify-end items-center gap-4 bg-white w-full py-4 px-7">
				<Button variant="gray" onPress={back}>
					<Text>Calcular novamente</Text>
				</Button>

				<Button variant="black" onPress={() => push("/app/more/calculators")}>
					<Text>Finalizar</Text>

					<IconArrowNarrowRight color={colors.white} />
				</Button>
			</View>
		</View>
	);
}
