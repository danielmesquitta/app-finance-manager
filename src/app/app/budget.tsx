import {
	IconChartBar,
	IconCircleCheck,
	IconCoins,
	IconTrendingUp,
} from "@/assets/app";
import { Text, HeadNavigation } from "@/components";
import { colors } from "@/styles";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function BudgetPage() {
	return (
		<View className="flex-1 bg-white">
			<HeadNavigation title="Orçamento" showBackButton={false} />

			<ScrollView className="flex-1 border-t border-gray-50">
				<View className="bg-white p-7 items-center">
					<View className="flex-row items-center gap-2">
						<IconCircleCheck color={colors.green[500]} width={16} height={16} />

						<Text className="text-sm font-jakarta-500 text-green-500">
							Orçamento
						</Text>
					</View>

					<View className="flex-row items-end gap-2 my-2">
						<Text className="text-xl text-gray-400">R$</Text>

						<Text className="text-3xl font-jakarta-600 text-black">
							1000,00
						</Text>
					</View>

					<Text className="text-gray-400">/ R$ 4.000,00</Text>

					<View className="items-center gap-2 w-full mt-8">
						<View className="w-full h-2 flex-row items-center rounded-full bg-gray-100">
							<View className="w-1/6 h-full rounded-l-full bg-primary-400" />
							<View className="w-1/6 h-full bg-[#56BADA]" />
							<View className="w-2/6 h-full rounded-r-full bg-[#6347EB]" />
						</View>

						<View
							style={{ left: "66%" }}
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
						<View className="border border-solid border-gray-100 rounded-xl flex-1">
							<View className="bg-gray-50 rounded-t-xl py-3 px-4 flex-row items-center gap-3">
								<View className="p-1.5 bg-white rounded-xl">
									<IconCoins width={16} height={16} color={colors.green[500]} />
								</View>

								<Text className="text-xs font-jakarta-500 text-black">
									Disponível
								</Text>
							</View>

							<View className="py-3 px-4 gap-1">
								<View className="flex-row items-end gap-1">
									<Text className="text-sm text-gray-400">R$</Text>

									<Text className="text-xl font-jakarta-600 text-black">
										1000,00
									</Text>
								</View>

								<View className="flex-row items-center">
									<IconTrendingUp
										width={16}
										height={16}
										color={colors.green[500]}
									/>

									<Text className="text-xs ml-2 mr-1 text-green-500">+23%</Text>

									<Text className="text-xs text-gray-400">que agosto</Text>
								</View>
							</View>
						</View>

						<View className="border border-solid border-gray-100 rounded-xl flex-1">
							<View className="bg-gray-50 rounded-t-xl py-3 px-4 flex-row items-center gap-3">
								<View className="p-1.5 bg-white rounded-xl">
									<IconChartBar
										width={16}
										height={16}
										color={colors.green[500]}
									/>
								</View>

								<Text className="text-xs font-jakarta-500 text-black">
									Média por dia
								</Text>
							</View>

							<View className="py-3 px-4 gap-1">
								<View className="flex-row items-end gap-1">
									<Text className="text-sm text-gray-400">R$</Text>

									<Text className="text-xl font-jakarta-600 text-black">
										41,62
									</Text>
								</View>

								<View className="flex-row items-center">
									<IconTrendingUp
										width={16}
										height={16}
										color={colors.green[500]}
									/>

									<Text className="text-xs ml-2 mr-1 text-green-500">+20%</Text>

									<Text className="text-xs text-gray-400">que agosto</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				<View className="p-7 flex-1 bg-gray-50">
					<View className="flex-row items-center gap-2">
						<IconCircleCheck color={colors.green[500]} width={16} height={16} />

						<Text className="text-sm font-jakarta-500 text-green-500">
							Orçamento
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
