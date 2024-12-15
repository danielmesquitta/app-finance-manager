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
	"group flex items-center justify-center rounded-md",
	{
		variants: {
			variant: {
				ghost: "active:bg-accent",
				default: "bg-primary active:opacity-90",
				outline: "border border-input bg-background active:bg-accent",
				secondary: "bg-secondary active:opacity-80",
				destructive: "bg-destructive active:opacity-90",
			},
			size: {
				sm: "h-9 rounded-md px-3",
				lg: "rounded-md px-8 h-14",
				icon: "size-10",
				default: "h-12 px-5 py-3",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	},
);

const buttonTextVariants = cva("text-base font-medium", {
	variants: {
		variant: {
			ghost: "group-active:text-accent-foreground",
			default: "text-primary-foreground",
			outline: "group-active:text-accent-foreground",
			secondary:
				"text-secondary-foreground group-active:text-secondary-foreground",
			destructive: "text-destructive-foreground",
		},
		size: {
			sm: "",
			lg: "text-lg",
			icon: "",
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
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
