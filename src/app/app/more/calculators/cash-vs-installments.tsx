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
	Label,
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
import { calculateCashVsInstallments } from "@/contracts";
import { toast } from "@backpackapp-io/react-native-toast";

const interestTypeOptions = [
	{ value: "ANNUAL", label: "Anual" },
	{ value: "MONTHLY", label: "Mensal" },
];

const schema = z.object({
	cashback: z.coerce
		.number({ message: "Digite o valor do cashback" })
		.min(0, { message: "O valor do cashback deve ser maior que 0" })
		.optional(),
	interest: z.coerce
		.number({ message: "Digite a taxa de juros" })
		.min(0, { message: "A taxa de juros deve ser maior que 0" })
		.max(1000, { message: "A taxa de juros deve ser menor que 100" }),
	installments: z.coerce
		.number({ message: "Digite o número de parcelas" })
		.min(1, { message: "O número de parcelas deve ser maior que 0" }),
	cash_discount: z.coerce
		.number({ message: "Digite a porcentagem do desconto" })
		.min(0, {
			message: "A porcentagem do desconto deve ser maior que 0",
		})
		.max(1000, {
			message: "A porcentagem do desconto deve ser menor que 100",
		})
		.optional(),
	interest_type: z.enum(["ANNUAL", "MONTHLY"], {
		message: "Selecione o tipo de juros",
	}),
	purchase_value: z
		.string({ message: "Digite o valor da compra" })
		.transform((value) => (value ? Number(masks.clear(value)) : 0)),
	credit_card_interest: z.coerce
		.number({ message: "Digite a taxa de juros do cartão de crédito" })
		.min(0, {
			message: "A taxa de juros do cartão de crédito deve ser maior que 0",
		})
		.max(1000, {
			message: "A taxa de juros do cartão de crédito deve ser menor que 100",
		})
		.optional(),
});

type FormSchema = z.infer<typeof schema>;

export default function CashVsInstallments() {
	const [isLoading, setIsLoading] = useState(false);

	const { push } = useRouter();

	const setCalculator = useCalculatorStore((state) => state.setCalculator);

	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			interest: 12,
			interest_type: "MONTHLY",
		},
	});

	async function onSubmit(payload: FormSchema) {
		setIsLoading(true);

		await calculateCashVsInstallments(payload)
			.then(({ data }) => {
				setCalculator({
					type: "CASH_VS_INSTALLMENTS",
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
				<HeadNavigation title="À vista ou parcelado" />

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
									name="purchase_value"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Valor da compra</FormLabel>
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
									name="cash_discount"
									control={form.control}
									render={({ field }) => (
										<FormItem className="mb-5">
											<FormLabel>Desconto à vista (%)</FormLabel>
											<FormControl>
												<Input
													inputMode="decimal"
													placeholder="10"
													keyboardType="decimal-pad"
													onChangeText={field.onChange}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<View className="flex-col mb-5 gap-1">
									<Label>Rentabilidade anual nos investimentos</Label>

									<View className="flex-row items-end gap-5">
										<FormField
											name="interest"
											control={form.control}
											render={({ field }) => (
												<FormItem className="flex-1">
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
								</View>

								<View className="flex-row items-end gap-5 mb-5">
									<FormField
										name="installments"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Número de parcelas</FormLabel>
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

									<FormField
										name="credit_card_interest"
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Juros no parcelamento (%)</FormLabel>
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
								</View>

								<FormField
									name="cashback"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cashback no cartão de crédito (%)</FormLabel>
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
