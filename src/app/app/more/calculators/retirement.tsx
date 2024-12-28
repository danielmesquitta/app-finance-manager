import { KeyboardAvoidingView, Platform, View } from "react-native";
import {
	Button,
	DismissKeyboard,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	HeadNavigation,
	Input,
	Text,
} from "@/components";
import { ScrollView } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowNarrowRight } from "@/assets/app";
import { colors } from "@/styles";
import { masks } from "@/utils";

const schema = z.object({
	age: z.coerce
		.number({ message: "Digite sua idade" })
		.min(14, { message: "Você precisa ter pelo menos 14 anos" }),
	goal_income: z.coerce
		.number({ message: "Digite sua rentabilidade projetada" })
		.min(0, { message: "Digite sua rentabilidade projetada" })
		.default(0),
	monthly_income: z
		.string({ message: "Digite sua renda mensal" })
		.min(1, { message: "Digite sua renda mensal" }),
	retirement_age: z.coerce
		.number({ message: "Digite a idade de aposentadoria" })
		.min(18, { message: "Você precisa ter pelo menos 18 anos" }),
	goal_patrimony: z
		.string({ message: "Digite o valor do patrimônio" })
		.min(1, { message: "Digite o valor do patrimônio" }),
	initial_deposit: z
		.string()
		.transform((value) => Number(masks.clear(value)))
		.default("0"),
	income_investment_percentage: z
		.number({ message: "Digite a porcentagem de investimento" })
		.min(0, { message: "O valor deve ser maior que 0" })
		.max(100, { message: "O valor deve ser menor que 100" }),
});

type FormSchema = z.infer<typeof schema>;

export default function Retirement() {
	const { push } = useRouter();

	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
	});

	async function onSubmit(data: FormSchema) {
		console.log(data);
	}

	return (
		<DismissKeyboard>
			<View className="flex-1">
				<HeadNavigation title="Aposentadoria" />

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1"
				>
					<View className="flex-1 justify-center p-7">
						<ScrollView className="flex-1 bg-white rounded-xl p-5">
							<Form {...form}>
								<FormField
									name="monthly_income"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Qual sua renda mensal?</FormLabel>
											<FormControl>
												<Input
													mask="CURRENCY"
													inputMode="numeric"
													placeholder="R$ 5.000,00"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="initial_deposit"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Quanto você já tem investido?</FormLabel>
											<FormControl>
												<Input
													mask="CURRENCY"
													inputMode="numeric"
													placeholder="R$ 50.000,00"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="goal_patrimony"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>
												Com quanto de patrimônio você quer aposentar?
											</FormLabel>
											<FormControl>
												<Input
													mask="CURRENCY"
													inputMode="numeric"
													placeholder="R$ 1.000.000,00"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="income_investment_percentage"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>
												Quantos % da sua renda você investe?
											</FormLabel>
											<FormControl>
												<Input
													inputMode="numeric"
													placeholder="20"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="age"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Qual sua idade atual?</FormLabel>
											<FormControl>
												<Input
													inputMode="numeric"
													placeholder="30"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="retirement_age"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>
												Com quantos anos você deseja aposentar?
											</FormLabel>
											<FormControl>
												<Input
													inputMode="numeric"
													placeholder="65"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="goal_income"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>
												Sua rentabilidade total anual projetada
											</FormLabel>
											<FormControl>
												<Input
													inputMode="numeric"
													placeholder="10"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="goal_income"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>
												Quanto você pretende gastar por mês aposentado?
											</FormLabel>
											<FormControl>
												<Input
													mask="CURRENCY"
													inputMode="numeric"
													placeholder="R$ 10.000,00"
													keyboardType="numeric"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</Form>
						</ScrollView>
					</View>
				</KeyboardAvoidingView>

				<View className="flex-row justify-end items-center gap-4 bg-white w-full py-4 px-7">
					<Button variant="gray" onPress={() => form.reset()}>
						<Text>Limpar campos</Text>
					</Button>

					<Button variant="black" onPress={form.handleSubmit(onSubmit)}>
						<Text>Calcular valores</Text>

						<IconArrowNarrowRight color={colors.white} />
					</Button>
				</View>
			</View>
		</DismissKeyboard>
	);
}
