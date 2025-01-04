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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Text,
	Slider,
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
import { calculateEmergencyReserve } from "@/contracts";
import { toast } from "@backpackapp-io/react-native-toast";

const schema = z.object({
	job_type: z.enum(["EMPLOYEE", "ENTREPRENEUR", "CIVIL_SERVANT"], {
		message: "Selecione o tipo de emprego",
	}),
	monthly_income: z
		.string({ message: "Digite o seu salário mensal" })
		.min(1, { message: "Digite o seu salário mensal" })
		.transform((value) => Number(masks.clear(value))),
	monthly_expenses: z
		.string({ message: "Digite seu custo fixo por mês" })
		.min(1, { message: "Digite seu custo fixo por mês" })
		.transform((value) => Number(masks.clear(value))),
	monthly_savings_percentage: z.number({
		message: "Informe quanto você guarda por mês",
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
			monthly_savings_percentage: 20,
		},
	});

	async function onSubmit(payload: FormSchema) {
		setIsLoading(true);

		await calculateEmergencyReserve(payload)
			.then(({ data }) => {
				setCalculator({
					type: "EMERGENCY_RESERVE",
					data: {
						...data,
						...payload,
					},
				});

				push("/app/more/calculators/feedback");
			})
			.catch((error) =>
				toast.error(
					error?.message || "Erro ao calcular a reserva de emergência",
				),
			)
			.finally(() => setIsLoading(false));
	}

	return (
		<DismissKeyboard>
			<View className="flex-1">
				<HeadNavigation title="Reserva de emergência" />

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1"
				>
					<View className="flex-1 p-7">
						<ScrollView
							className="flex-1 bg-white rounded-xl"
							contentContainerClassName="p-5"
						>
							<Form {...form}>
								<FormField
									name="job_type"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Tipo de emprego</FormLabel>

											<Select
												onValueChange={(option) =>
													field.onChange(option?.value)
												}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecione o tipo de emprego" />
													</SelectTrigger>
												</FormControl>

												<SelectContent>
													<SelectItem value="EMPLOYEE" label="CLT" />
													<SelectItem
														value="CIVIL_SERVANT"
														label="Funcionário Público"
													/>
													<SelectItem
														value="ENTREPRENEUR"
														label="MEI/Autônomo/Empreendedor"
													/>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="monthly_expenses"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Qual seu custo fixo?</FormLabel>
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
									name="monthly_income"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Qual seu salário mensal?</FormLabel>
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
									name="monthly_savings_percentage"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Quanto você guarda por mês?</FormLabel>
											<FormControl>
												<Slider
													value={field.value}
													minimumValue={0}
													maximumValue={100}
													onValueChange={field.onChange}
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
