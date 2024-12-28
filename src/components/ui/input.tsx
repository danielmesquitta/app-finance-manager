import { TextInput, type TextInputProps } from "react-native";
import { cn, masks } from "@/utils";
import type { ElementRef } from "react";
import { forwardRef } from "react";

interface InputProps extends Omit<TextInputProps, "value"> {
	mask?: "CPF" | "CEP" | "DATE" | "PHONE" | "CURRENCY";
	value?: string | number;
}

const Input = forwardRef<ElementRef<typeof TextInput>, InputProps>(
	({ mask, className, onChangeText, placeholderClassName, ...props }, ref) => {
		const value = props.value ? props.value.toString() : undefined;

		return (
			<TextInput
				ref={ref}
				{...props}
				value={value}
				className={cn(
					"h-14 rounded-xl border border-solid border-gray-100 bg-white px-4 text-sm text-black font-jakarta-600",
					props.editable === false && "opacity-50",
					className,
				)}
				onChangeText={async (text) => {
					let message = text;

					switch (mask) {
						case "CPF":
							message = masks.cpf(message);
							break;

						case "CEP":
							message = masks.cep(message);
							break;

						case "DATE":
							message = masks.date(message);
							break;

						case "PHONE":
							message = masks.phone(message);
							break;

						case "CURRENCY":
							message = masks.money(message);
							break;

						default:
							break;
					}

					if (onChangeText) onChangeText(message);
				}}
				placeholderClassName={cn(
					"text-gray-400 font-jakarta-400",
					placeholderClassName,
				)}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
