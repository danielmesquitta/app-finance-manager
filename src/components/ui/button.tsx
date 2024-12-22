import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";
import { cn } from "@/utils";
import { TextClassContext } from "./text";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
	type ReactNode,
} from "react";
import { Loading } from "./loading";

const buttonVariants = cva(
	"flex flex-row items-center justify-center rounded-xl gap-3",
	{
		variants: {
			variant: {
				default: "bg-primary-500",
				secondary: "bg-secondary",
				destructive: "bg-destructive",
			},
			size: {
				sm: "h-9 rounded-md px-3",
				lg: "px-8 h-14",
				default: "h-12 px-4 py-3",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	},
);

const buttonTextVariants = cva("font-jakarta-600", {
	variants: {
		variant: {
			default: "text-white",
			secondary: "text-secondary-foreground",
			destructive: "text-destructive-foreground",
		},
		size: {
			sm: "text-sm",
			lg: "text-lg",
			default: "text-sm",
		},
	},
	defaultVariants: {
		size: "default",
		variant: "default",
	},
});

type ButtonProps = ComponentPropsWithoutRef<typeof Pressable> &
	VariantProps<typeof buttonVariants> & {
		loading?: boolean;
	};

const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
	(
		{ className, variant, size, children, disabled, loading, ...props },
		ref,
	) => {
		return (
			<TextClassContext.Provider
				value={buttonTextVariants({
					size,
					variant,
				})}
			>
				<Pressable
					ref={ref}
					className={cn(
						disabled && "opacity-50",
						buttonVariants({ variant, size, className }),
					)}
					disabled={disabled || loading}
					{...props}
				>
					{children as ReactNode}

					{loading && <Loading />}
				</Pressable>
			</TextClassContext.Provider>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };

export type { ButtonProps };
