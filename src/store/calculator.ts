import type { CalculateRetirementResponse } from "@/contracts";
import { create } from "zustand";
import { combine } from "zustand/middleware";

interface Retirement {
	type: "RETIREMENT";
	data: CalculateRetirementResponse;
}

export type CalculatorState = Retirement;

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
