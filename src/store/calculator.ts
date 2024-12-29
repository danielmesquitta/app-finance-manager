import type {
	CalculateEmergencyReserveResponse,
	CalculateRetirementResponse,
} from "@/contracts";
import { create } from "zustand";
import { combine } from "zustand/middleware";

interface Retirement {
	type: "RETIREMENT";
	data: CalculateRetirementResponse;
}

interface EmergencyReserve {
	type: "EMERGENCY_RESERVE";
	data: CalculateEmergencyReserveResponse;
}

export type CalculatorState = Retirement | EmergencyReserve;

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
