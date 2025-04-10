import { cn } from "@/utils";
import { type VariantProps, cva } from "class-variance-authority";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  forwardRef,
} from "react";
import { Pressable } from "react-native";
import { Loading } from "./loading";
import { TextClassContext } from "./text";

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded-xl gap-3 border border-solid border-transparent",
  {
    variants: {
      variant: {
        gray: "bg-transparent border-gray-100",
        black: "bg-black border-black",
        default: "bg-primary-500 border-primary-500",
        secondary: "bg-secondary",
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
  }
);

const buttonTextVariants = cva("font-jakarta-600", {
  variants: {
    variant: {
      gray: "text-gray-500",
      black: "text-white",
      default: "text-white",
      secondary: "text-secondary-foreground",
    },
    size: {
      sm: "text-base",
      lg: "text-xl",
      default: "text-base",
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
    ref
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
          disabled={disabled || loading}
          className={cn(
            disabled && "opacity-50",
            buttonVariants({ variant, size, className })
          )}
          {...props}
        >
          {children as ReactNode}

          {loading && <Loading />}
        </Pressable>
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };

export type { ButtonProps };
