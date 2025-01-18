import type {
	CalculateCashVsInstallmentsResponse,
	CalculateCompoundInterestResponse,
	CalculateEmergencyReserveParams,
	CalculateEmergencyReserveResponse,
	CalculateRetirementResponse,
	CalculateSimpleInterestResponse,
} from "@/contracts";
import { create } from "zustand";
import { combine } from "zustand/middleware";

interface Retirement {
	type: "RETIREMENT";
	data: CalculateRetirementResponse;
}

interface SimpleInterest {
	type: "SIMPLE_INTEREST";
	data: CalculateSimpleInterestResponse;
}

interface CompoundInterest {
	type: "COMPOUND_INTEREST";
	data: CalculateCompoundInterestResponse;
}

interface EmergencyReserve {
	type: "EMERGENCY_RESERVE";
	data: CalculateEmergencyReserveResponse &
		Omit<CalculateEmergencyReserveParams, "job_type">;
}

interface CashVsInstallments {
	type: "CASH_VS_INSTALLMENTS";
	data: CalculateCashVsInstallmentsResponse;
}

export type CalculatorState =
	| Retirement
	| SimpleInterest
	| CompoundInterest
	| EmergencyReserve
	| CashVsInstallments;

const initialState = {} as CalculatorState;

export const useCalculatorStore = create(
	combine(initialState, (set) => ({
		...initialState,
		setCalculator: (calculator: CalculatorState) =>
			set((state) => ({
				...state,
				...calculator,
			})),
	})),
);
