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
import { calculateCompoundInterest } from "@/contracts";
import { toast } from "@backpackapp-io/react-native-toast";

const interestTypeOptions = [
	{ value: "ANNUAL", label: "Anual" },
	{ value: "MONTHLY", label: "Mensal" },
];

const schema = z.object({
	interest: z.coerce
		.number({ message: "Digite a taxa de juros" })
		.min(0, { message: "A taxa de juros deve ser maior que 0" })
		.max(1000, { message: "A taxa de juros deve ser menor que 1000" }),
	interest_type: z.enum(["ANNUAL", "MONTHLY"], {
		message: "Selecione o tipo de juros",
	}),
	initial_deposit: z
		.string({ message: "Digite o valor inicial" })
		.transform((value) => (value ? Number(masks.clear(value)) : 0)),
	monthly_deposit: z
		.string({ message: "Digite o valor mensal" })
		.transform((value) => (value ? Number(masks.clear(value)) : 0)),
	period_in_months: z.coerce
		.number({ message: "Digite o período em meses" })
		.min(1, { message: "O período deve ser maior que 0" }),
});

type FormSchema = z.infer<typeof schema>;

export default function CompoundInterest() {
	const [isLoading, setIsLoading] = useState(false);

	const { push } = useRouter();

	const setCalculator = useCalculatorStore((state) => state.setCalculator);

	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			interest: 12,
			interest_type: "ANNUAL",
			period_in_months: 12,
		},
	});

	async function onSubmit(payload: FormSchema) {
		setIsLoading(true);

		await calculateCompoundInterest(payload)
			.then(({ data }) => {
				setCalculator({
					type: "COMPOUND_INTEREST",
					data,
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

	const formValues = form.watch();

	const interestType = interestTypeOptions.find(
		(option) => option.value === formValues.interest_type,
	);

	return (
		<DismissKeyboard>
			<View className="flex-1">
				<HeadNavigation title="Juros compostos" />

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
									name="initial_deposit"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Valor inicial</FormLabel>
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

								<View className="flex-row items-end gap-5 mb-5">
									<FormField
										name="interest"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Taxa de juros</FormLabel>
												<FormControl>
													<Input
														inputMode="decimal"
														placeholder="12"
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
										name="interest_type"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex-1">
												<Select
													defaultValue={interestType}
													onValueChange={(option) =>
														field.onChange(option?.value)
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Selecione o intervalo" />
														</SelectTrigger>
													</FormControl>

													<SelectContent>
														{interestTypeOptions.map(({ value, label }) => (
															<SelectItem
																key={value}
																value={value}
																label={label}
															/>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</View>

								<View className="flex-row items-end gap-5">
									<FormField
										name="monthly_deposit"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Valor mensal</FormLabel>
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
										name="period_in_months"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Período em meses</FormLabel>
												<FormControl>
													<Input
														inputMode="numeric"
														placeholder="12"
														keyboardType="numeric"
														onChangeText={field.onChange}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</View>
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
