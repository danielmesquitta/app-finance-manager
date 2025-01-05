import { api } from "@/services";
import { masks } from "@/utils";
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

interface CalculateSimpleInterestParams {
	interest: number;
	interest_type: "ANNUAL" | "MONTHLY";
	initial_deposit: number;
	period_in_months: number;
}

interface CalculateInterestByMonth {
	total_amount: number;
	total_deposit: number;
	total_interest: number;
}

export interface CalculateSimpleInterestResponse {
	by_month: Record<string, CalculateInterestByMonth>;
	total_amount: number;
	total_deposit: number;
	total_interest: number;
}

interface CalculateCompoundInterestParams {
	interest: number;
	interest_type: "ANNUAL" | "MONTHLY";
	initial_deposit: number;
	monthly_deposit: number;
	period_in_months: number;
}

export interface CalculateCompoundInterestResponse {
	by_month: Record<string, CalculateInterestByMonth>;
	total_amount: number;
	total_deposit: number;
	total_interest: number;
}

export interface CalculateEmergencyReserveParams {
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
		interest: masks.percentage.parse(payload.interest),
		interest_type: "ANNUAL",
		income_investment_percentage: masks.percentage.parse(
			payload.income_investment_percentage,
		),
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
		monthly_savings_percentage: masks.percentage.parse(
			payload.monthly_savings_percentage,
		),
	});
}

export function calculateSimpleInterest(
	payload: CalculateSimpleInterestParams,
) {
	return api.post<
		CalculateSimpleInterestParams,
		AxiosResponse<CalculateSimpleInterestResponse>
	>("/v1/calculator/simple-interest", {
		...payload,
		interest: masks.percentage.parse(payload.interest),
	});
}

export function calculateCompoundInterest(
	payload: CalculateCompoundInterestParams,
) {
	return api.post<
		CalculateCompoundInterestParams,
		AxiosResponse<CalculateCompoundInterestResponse>
	>("/v1/calculator/compound-interest", {
		...payload,
		interest: masks.percentage.parse(payload.interest),
	});
}
