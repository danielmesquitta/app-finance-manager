import * as Slot from "@rn-primitives/slot";
import type { SlottableTextProps, TextRef } from "@rn-primitives/types";
import { Text as RNText } from "react-native";
import { cn } from "@/utils";
import { createContext, forwardRef, useContext } from "react";

const TextClassContext = createContext<string | undefined>(undefined);

const Text = forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, ...props }, ref) => {
		const textClass = useContext(TextClassContext);

		const Component = asChild ? Slot.Text : RNText;

		return (
			<Component
				ref={ref}
				className={cn("text-base", textClass, className)}
				{...props}
			/>
		);
	},
);

Text.displayName = "Text";

export { Text, TextClassContext };
