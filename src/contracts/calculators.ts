import { api } from "@/services";
import type { AxiosResponse } from "axios";

interface CalculateRetirementParams {
	age: number;
	interest: number;
	goal_income: number;
	retirement_age: number;
	monthly_income: number;
	goal_patrimony: number;
	initial_deposit: number;
	life_expectancy: number;
	income_investment_percentage: number;
}

interface CalculateRetirementResponse {
	heritage: number;
	achieved_goal_income: boolean;
	max_monthly_expenses: number;
	property_on_retirement: number;
	achieved_goal_patrimony: boolean;
}

export function calculateRetirement(payload: CalculateRetirementParams) {
	return api.post<
		CalculateRetirementParams,
		AxiosResponse<CalculateRetirementResponse>
	>("/v1/calculator/retirement", {
		...payload,
		interest_type: "ANNUAL",
	});
}
