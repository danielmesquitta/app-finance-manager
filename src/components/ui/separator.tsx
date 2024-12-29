import * as SeparatorPrimitive from "@rn-primitives/separator";
import { cn } from "@/utils";
import { forwardRef } from "react";

const Separator = forwardRef<
	SeparatorPrimitive.RootRef,
	SeparatorPrimitive.RootProps
>(
	(
		{ className, orientation = "horizontal", decorative = true, ...props },
		ref,
	) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"shrink-0 bg-gray-100",
				orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
				className,
			)}
			{...props}
		/>
	),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
