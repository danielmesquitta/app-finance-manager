import * as AvatarPrimitive from "@rn-primitives/avatar";
import { cn } from "@/utils";
import { forwardRef } from "react";

const Avatar = forwardRef<AvatarPrimitive.RootRef, AvatarPrimitive.RootProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex size-10 shrink-0 overflow-hidden rounded-2xl",
				className,
			)}
			{...props}
		/>
	),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
	AvatarPrimitive.ImageRef,
	AvatarPrimitive.ImageProps
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square size-full", className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
	AvatarPrimitive.FallbackRef,
	AvatarPrimitive.FallbackProps
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex size-full items-center justify-center rounded-2xl bg-primary-400",
			className,
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
