import { cn } from "@/utils";
import * as LabelPrimitive from "@rn-primitives/label";
import { forwardRef } from "react";

const Label = forwardRef<LabelPrimitive.TextRef, LabelPrimitive.TextProps>(
  (
    { className, onPress, onLongPress, onPressIn, onPressOut, ...props },
    ref
  ) => (
    <LabelPrimitive.Root
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
    >
      <LabelPrimitive.Text
        ref={ref}
        className={cn("text-sm text-black font-jakarta-400", className)}
        {...props}
      />
    </LabelPrimitive.Root>
  )
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
