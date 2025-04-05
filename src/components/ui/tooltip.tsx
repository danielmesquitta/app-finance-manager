import { cn } from "@/utils";
import * as TooltipPrimitive from "@rn-primitives/tooltip";
import { forwardRef } from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { TextClassContext } from "./text";

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  TooltipPrimitive.ContentRef,
  TooltipPrimitive.ContentProps & { portalHost?: string }
>(({ className, sideOffset = 4, portalHost, ...props }, ref) => (
  <TooltipPrimitive.Portal hostName={portalHost}>
    <TooltipPrimitive.Overlay style={StyleSheet.absoluteFill}>
      <Animated.View exiting={FadeOut} entering={FadeIn}>
        <TextClassContext.Provider value="text-base">
          <TooltipPrimitive.Content
            ref={ref}
            className={cn(
              "z-50 overflow-hidden rounded-md border border-solid border-gray-50 bg-white px-3 py-1.5",
              className
            )}
            sideOffset={sideOffset}
            {...props}
          />
        </TextClassContext.Provider>
      </Animated.View>
    </TooltipPrimitive.Overlay>
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipTrigger };
