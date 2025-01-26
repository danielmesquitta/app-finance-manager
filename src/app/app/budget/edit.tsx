import { Text, HeadNavigation, Button, DismissKeyboard } from "@/components";
import { BUDGETS_KEY, getBudgets } from "@/contracts";
import { useQuery } from "@tanstack/react-query";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function BudgetEdit() {
	const { data: budgets } = useQuery({
		queryFn: () => getBudgets({}),
		queryKey: [BUDGETS_KEY],
	});

	return (
		<DismissKeyboard>
			<View className="flex-1">
				<HeadNavigation title="Editar orçamento" />

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1"
				>
					<View className="flex-1">
						<ScrollView className="flex-1">
							<View className="bg-white p-7 items-center">
								<Text className="text-sm text-gray-500">Valor total</Text>

								<View className="flex-row items-end gap-2 my-2">
									<Text className="text-xl text-gray-400">R$</Text>

									<Text className="text-3xl font-jakarta-600 text-black">
										4000,00
									</Text>
								</View>

								<View className="items-center gap-2 w-full mt-8">
									<View className="w-full h-2 flex-row items-center rounded-full bg-gray-100">
										<View className="w-1/6 h-full rounded-l-full bg-primary-400" />
										<View className="w-1/6 h-full bg-cyan-500" />
										<View className="w-2/6 h-full bg-purple-500" />
										<View className="w-1/6 h-full bg-pink-500" />
										<View className="w-1/6 h-full rounded-r-full bg-green-300" />
									</View>

									<View className="flex-row w-full items-center gap-2 justify-between">
										<Text className="text-xs text-gray-400">0%</Text>

										<Text className="text-xs text-gray-400">100%</Text>
									</View>
								</View>
							</View>
						</ScrollView>
					</View>
				</KeyboardAvoidingView>

				<View className="flex-row justify-end items-center gap-4 bg-white w-full py-4 px-7">
					<Button variant="gray">
						<Text>Cancelar</Text>
					</Button>

					<Button variant="black">
						<Text>Salvar alterações</Text>
					</Button>
				</View>
			</View>
		</DismissKeyboard>
	);
}
