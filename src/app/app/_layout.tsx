import { Text } from "@/components";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";

export default function Layout() {
	return (
		<Tabs>
			<TabSlot />

			<TabList className="bg-white py-2 px-6 rounded-t-lg">
				<TabTrigger name="index" href="/app" className="px-4 py-3">
					<Text className="text-xs text-gray-400">Início</Text>
				</TabTrigger>
				<TabTrigger
					name="transactions"
					href="/app/transactions"
					className="px-4 py-3"
				>
					<Text className="text-xs text-gray-400">Transações</Text>
				</TabTrigger>
				<TabTrigger name="budget" href="/app/budget" className="px-4 py-3">
					<Text className="text-xs text-gray-400">Orçam.</Text>
				</TabTrigger>
				<TabTrigger
					name="investments"
					href="/app/investments"
					className="px-4 py-3"
				>
					<Text className="text-xs text-gray-400">Invest.</Text>
				</TabTrigger>
			</TabList>
		</Tabs>
	);
}
