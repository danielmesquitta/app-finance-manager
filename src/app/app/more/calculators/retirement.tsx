import { KeyboardAvoidingView, Platform, View } from "react-native";
import {
	DismissKeyboard,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	HeadNavigation,
	Input,
} from "@/components";
import { ScrollView } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	age: z.string({ message: "Digite sua idade" }).min(14, {
		message: "Digite sua idade",
	}),
	monthly_income: z
		.string({ message: "Digite sua renda mensal" })
		.min(1, { message: "Digite sua renda mensal" }),
	initial_deposit: z
		.string({ message: "Digite o valor inicial" })
		.min(1, { message: "Digite o valor inicial" }),
	goal_patrimony: z
		.string({ message: "Digite o valor do patrimônio" })
		.min(1, { message: "Digite o valor do patrimônio" }),
	income_investment_percentage: z
		.string({ message: "Digite a porcentagem de investimento" })
		.min(1, { message: "Digite a porcentagem de investimento" }),
});

type FormSchema = z.infer<typeof schema>;

export default function Retirement() {
	const { push } = useRouter();

	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
	});

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
													placeholder="R$ 5.000,00"
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
													placeholder="R$ 50.000,00"
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
													placeholder="R$ 1.000.000,00"
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
													placeholder="20"
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
													placeholder="30"
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
			</View>
		</DismissKeyboard>
	);
}
