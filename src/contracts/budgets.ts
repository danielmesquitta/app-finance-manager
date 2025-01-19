import type { Budget } from "@/models";
import { api } from "@/services";

export const BUDGETS_KEY = "budgets";

interface GetBudgetsParams {
	date?: string;
}

export async function getBudgets({ date }: GetBudgetsParams) {
	const currentDate = new Date();

	return api
		.get<Budget>("/v1/budgets", {
			params: {
				date: date ?? currentDate.toISOString(),
			},
		})
		.then((response) => response.data);
}
