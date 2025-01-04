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
import { useState } from "react";
import { useCalculatorStore } from "@/store";
import { calculateRetirement } from "@/contracts";
import { toast } from "@backpackapp-io/react-native-toast";

const schema = z.object({
	age: z.coerce
		.number({ message: "Digite sua idade" })
		.min(1, { message: "Você precisa ter pelo menos 1 ano" }),
	interest: z
		.string({ message: "Digite sua rentabilidade projetada" })
		.min(1, { message: "Digite sua rentabilidade projetada" })
		.transform((value) => Number.parseFloat(value.replace(",", ".")))
		.refine((value) => value > 0 && value < 100, {
			message: "O valor deve ser maior que 0 e menor que 100",
		}),
	goal_income: z
		.string({ message: "Digite o valor que você quer gastar por mês" })
		.min(1, { message: "Digite o valor que você quer gastar por mês" })
		.transform((value) => Number(masks.clear(value))),
	monthly_income: z
		.string({ message: "Digite sua renda mensal" })
		.min(1, { message: "Digite sua renda mensal" })
		.transform((value) => Number(masks.clear(value))),
	life_expectancy: z.coerce
		.number({ message: "Digite sua expectativa de vida" })
		.min(1, { message: "Digite sua expectativa de vida" }),
	retirement_age: z.coerce
		.number({ message: "Digite a idade de aposentadoria" })
		.min(18, { message: "Você precisa ter pelo menos 18 anos" }),
	goal_patrimony: z
		.string({ message: "Digite o valor do patrimônio" })
		.min(1, { message: "Digite o valor do patrimônio" })
		.transform((value) => Number(masks.clear(value))),
	initial_deposit: z
		.string()
		.transform((value) => Number(masks.clear(value)))
		.default("0"),
	income_investment_percentage: z
		.string({ message: "Digite a porcentagem de investimento" })
		.transform((value) => Number.parseFloat(value.replace(",", ".")))
		.refine((value) => value > 0 && value < 100, {
			message: "O valor deve ser maior que 0 e menor que 100",
		}),
});

type FormSchema = z.infer<typeof schema>;

export default function Retirement() {
	const [isLoading, setIsLoading] = useState(false);

	const { push } = useRouter();

	const setCalculator = useCalculatorStore((state) => state.setCalculator);

	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			interest: 4,
			retirement_age: 62,
			life_expectancy: 76,
		},
	});

	async function onSubmit(data: FormSchema) {
		setIsLoading(true);

		await calculateRetirement(data)
			.then(({ data }) => {
				setCalculator({ type: "RETIREMENT", data });

				push("/app/more/calculators/feedback");
			})
			.catch((error) =>
				toast.error(error?.message || "Erro ao calcular aposentadoria"),
			)
			.finally(() => setIsLoading(false));
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
						<ScrollView
							className="flex-1 bg-white rounded-xl"
							contentContainerClassName="p-5"
						>
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
													inputMode="decimal"
													placeholder="20"
													keyboardType="decimal-pad"
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
									name="interest"
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

								<FormField
									name="life_expectancy"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Informe a expectativa de vida</FormLabel>
											<FormControl>
												<Input
													inputMode="numeric"
													placeholder="76"
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

					<Button
						variant="black"
						onPress={form.handleSubmit(onSubmit)}
						loading={isLoading}
					>
						<Text>Calcular valores</Text>

						<IconArrowNarrowRight color={colors.white} />
					</Button>
				</View>
			</View>
		</DismissKeyboard>
	);
}
