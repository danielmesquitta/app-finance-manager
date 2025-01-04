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

export interface CalculateRetirementResponse {
	heritage: number;
	exceeded_goal: boolean;
	exceeded_goal_amount: number;
	achieved_goal_income: boolean;
	max_monthly_expenses: number;
	property_on_retirement: number;
	achieved_goal_patrimony: boolean;
}

interface CalculateEmergencyReserveParams {
	job_type: "EMPLOYEE" | "ENTREPRENEUR" | "CIVIL_SERVANT";
	monthly_income: number;
	monthly_expenses: number;
	monthly_savings_percentage: number;
}

export interface CalculateEmergencyReserveResponse {
	recommended_reserve_in_value: number;
	recommended_reserve_in_months: number;
	months_to_achieve_emergency_reserve: number;
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

export function calculateEmergencyReserve(
	payload: CalculateEmergencyReserveParams,
) {
	return api.post<
		CalculateEmergencyReserveParams,
		AxiosResponse<CalculateEmergencyReserveResponse>
	>("/v1/calculator/emergency-reserve", {
		...payload,
	});
}
