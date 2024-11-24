import { Tabs } from "@/components";

export default function Layout() {
	return (
		<Tabs>
			<Tabs.Screen name="index" options={{ title: "Início" }} />

			<Tabs.Screen name="transactions" options={{ title: "Transações" }} />

			<Tabs.Screen name="budget" options={{ title: "Orçam." }} />

			<Tabs.Screen name="investments" options={{ title: "Invest." }} />
		</Tabs>
	);
}
