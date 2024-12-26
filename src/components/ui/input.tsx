import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/utils";
import type { ElementRef } from "react";
import { forwardRef } from "react";

const Input = forwardRef<ElementRef<typeof TextInput>, TextInputProps>(
	({ className, placeholderClassName, ...props }, ref) => {
		return (
			<TextInput
				ref={ref}
				className={cn(
					"h-14 rounded-xl border border-solid border-gray-100 bg-white px-4 text-sm text-black font-jakarta-600",
					props.editable === false && "opacity-50",
					className,
				)}
				placeholderClassName={cn(
					"text-gray-400 font-jakarta-400",
					placeholderClassName,
				)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
