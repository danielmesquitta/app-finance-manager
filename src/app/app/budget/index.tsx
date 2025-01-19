import {
	IconBook,
	IconCar,
	IconChartBar,
	IconChevronRight,
	IconCircleCheck,
	IconCoins,
	IconHome2,
	IconMedicineSyrup,
	IconSettings,
	IconToolsKitchen2,
} from "@/assets/app";
import {
	Text,
	HeadNavigation,
	BudgetCard,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogHeader,
	Skeleton,
	HighlightCard,
} from "@/components";
import { BUDGETS_KEY, getBudgets } from "@/contracts";
import { colors } from "@/styles";
import { cn, masks } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const data = [
	{
		icon: IconToolsKitchen2,
		title: "Alimentação",
		color: colors.primary[500],
		spent: 18000,
		budget: 60000,
	},
	{
		icon: IconCar,
		title: "Transporte",
		color: colors.purple[500],
		spent: 20000,
		budget: 60000,
	},
	{
		icon: IconMedicineSyrup,
		title: "Farmácia",
		color: colors.cyan[500],
		spent: 32000,
		budget: 40000,
	},
	{
		icon: IconHome2,
		title: "Casa",
		color: colors.pink[500],
		spent: 80000,
		budget: 100000,
	},
	{
		icon: IconBook,
		title: "Educação",
		color: colors.green[300],
		spent: 60000,
		budget: 140000,
	},
];

export default function BudgetPage() {
	const { data: budgets } = useQuery({
		queryFn: () => getBudgets({}),
		queryKey: [BUDGETS_KEY],
	});

	const categories = budgets?.budget_categories
		? budgets.budget_categories.map(({ amount, category }) => {
				return {
					name: category.name,
					color: "#F00",
					percentage: (amount / budgets.amount) * 100,
				};
			})
		: [];

	const sumCategoriesPercentage = categories.reduce(
		(acc, { percentage }) => acc + percentage,
		0,
	);

	return (
		<View className="flex-1">
			<HeadNavigation title="Orçamento" showBackButton={false}>
				<Link href="/app/budget/edit" asChild>
					<TouchableOpacity className="p-2 rounded-xl bg-gray-50">
						<IconSettings width={20} height={20} color={colors.black} />
					</TouchableOpacity>
				</Link>
			</HeadNavigation>

			<ScrollView className="flex-1">
				<View className="bg-white p-7 items-center">
					<View className="flex-row items-center gap-2">
						<IconCircleCheck color={colors.green[500]} width={16} height={16} />

						<Text className="text-sm font-jakarta-500 text-green-500">
							Orçamento
						</Text>
					</View>

					<View className="flex-row items-end gap-2 my-2">
						<Text className="text-xl text-gray-400">R$</Text>

						{budgets?.spent !== undefined ? (
							<Text className="text-3xl font-jakarta-600 text-black">
								{masks.currencyWithoutSymbol(budgets.spent)}
							</Text>
						) : (
							<Skeleton className="w-40 h-8" />
						)}
					</View>

					{budgets?.amount !== undefined ? (
						<Text className="text-gray-400">
							/ R$ {masks.currencyWithoutSymbol(budgets.amount)}
						</Text>
					) : (
						<Skeleton className="w-40 h-6" />
					)}

					<View className="items-center gap-2 w-full mt-8">
						<View className="w-full h-2 flex-row items-center rounded-full bg-gray-100">
							{categories.map(({ name, color, percentage }, index) => (
								<View
									key={name}
									style={{
										width: `${percentage}%`,
										backgroundColor: color,
									}}
									className={cn(
										"h-full",
										index === 0 && "rounded-l-full",
										index === categories.length - 1 && "rounded-r-full",
									)}
								/>
							))}
						</View>

						<View
							style={{
								left: `${sumCategoriesPercentage === 100 ? 98 : sumCategoriesPercentage}%`,
							}}
							className="p-1 bg-white rounded-full absolute -top-1.5"
						>
							<View className="size-3 rounded-full bg-black" />
						</View>

						<View className="flex-row w-full items-center gap-2 justify-between">
							<Text className="text-xs text-gray-400">0%</Text>

							<Text className="text-xs text-gray-400">100%</Text>
						</View>
					</View>

					<View className="flex-row items-center gap-4 w-full mt-8">
						<HighlightCard
							icon={IconCoins}
							title="Disponível"
							value={budgets?.available}
							percentageVariation={budgets?.available_percentage_variation}
						/>

						<HighlightCard
							icon={IconChartBar}
							title="Média por dia"
							value={budgets?.available_per_day}
							percentageVariation={
								budgets?.available_per_day_percentage_variation
							}
							showNegativeVariation={false}
						/>
					</View>
				</View>

				<View className="p-7 flex-1 gap-4">
					{data.map(({ spent, budget, ...rest }) => {
						const percentage = (spent / budget) * 100;

						const remaining = budget - spent;

						return (
							<Dialog key={rest.title}>
								<DialogTrigger asChild>
									<TouchableOpacity className="p-5 gap-4 rounded-xl bg-white">
										<BudgetCard.Details {...rest} budget={budget}>
											<View className="ml-auto p-2 rounded-xl border border-solid border-gray-50">
												<IconChevronRight
													color={colors.black}
													width={16}
													height={16}
												/>
											</View>
										</BudgetCard.Details>

										<BudgetCard.Bar
											color={rest.color}
											percentage={percentage}
										/>

										<BudgetCard.Remaining spent={spent} remaining={remaining} />
									</TouchableOpacity>
								</DialogTrigger>

								<DialogContent isBottomSheet>
									<DialogHeader>
										<DialogTitle>Detalhes</DialogTitle>
									</DialogHeader>

									<View className="p-7 gap-5">
										<BudgetCard.Details {...rest} budget={budget} />

										<BudgetCard.Bar
											color={rest.color}
											percentage={percentage}
										/>

										<BudgetCard.Remaining spent={spent} remaining={remaining} />
									</View>

									<View className="bg-gray-50 p-7 gap-7">
										<Text className="text-sm text-gray-500">02 transações</Text>

										<View className="flex-row justify-between items-center">
											<View className="gap-1">
												<Text className="text-sm text-black font-jakarta-600">
													Posto Petrobrás 2
												</Text>

												<Text className="text-xs text-gray-500">Crédito</Text>
											</View>

											<View className="flex-row gap-2 items-center">
												<Text className="text-sm text-gray-400">R$</Text>

												<Text className="text-sm text-red-500 font-jakarta-600">
													100,00
												</Text>
											</View>
										</View>

										<View className="flex-row justify-between items-center">
											<View className="gap-1">
												<Text className="text-sm text-black font-jakarta-600">
													Posto Petrobrás 2
												</Text>

												<Text className="text-xs text-gray-500">Crédito</Text>
											</View>

											<View className="flex-row gap-2 items-center">
												<Text className="text-sm text-gray-400">R$</Text>

												<Text className="text-sm text-red-500 font-jakarta-600">
													100,00
												</Text>
											</View>
										</View>
									</View>
								</DialogContent>
							</Dialog>
						);
					})}
				</View>
			</ScrollView>
		</View>
	);
}
