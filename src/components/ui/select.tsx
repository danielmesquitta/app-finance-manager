import * as SelectPrimitive from "@rn-primitives/select";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { IconCheck, IconChevronDown } from "@/assets/app";
import { cn } from "@/utils";
import { forwardRef, type ReactNode } from "react";
import { colors } from "@/styles";

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
	SelectPrimitive.TriggerRef,
	SelectPrimitive.TriggerProps
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex-row items-center justify-between h-14 rounded-xl border border-solid border-gray-100 bg-white px-4 text-sm text-black font-jakarta-600",
			props.disabled && "opacity-50",
			className,
		)}
		{...props}
	>
		{children as ReactNode}

		<IconChevronDown color={colors.gray[500]} width={16} aria-hidden={true} />
	</SelectPrimitive.Trigger>
));

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = forwardRef<
	SelectPrimitive.ContentRef,
	SelectPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, position = "popper", portalHost, ...props }, ref) => {
	return (
		<SelectPrimitive.Portal hostName={portalHost}>
			<SelectPrimitive.Overlay style={StyleSheet.absoluteFill}>
				<Animated.View className="z-50" entering={FadeIn} exiting={FadeOut}>
					<SelectPrimitive.Content
						ref={ref}
						position={position}
						className={cn(
							"relative z-50 max-h-96 min-w-[8rem] rounded-xl border border-solid border-gray-100 bg-white py-2 px-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
							position === "popper" &&
								"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",

							className,
						)}
						{...props}
					>
						<SelectPrimitive.Viewport
							className={cn(
								"p-1",
								position === "popper" &&
									"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
							)}
						>
							{children}
						</SelectPrimitive.Viewport>
					</SelectPrimitive.Content>
				</Animated.View>
			</SelectPrimitive.Overlay>
		</SelectPrimitive.Portal>
	);
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
	SelectPrimitive.LabelRef,
	SelectPrimitive.LabelProps
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn(
			"pt-1.5 pb-2 pl-10 pr-2 text-black text-xs font-jakarta-600",
			className,
		)}
		{...props}
	/>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef<
	SelectPrimitive.ItemRef,
	SelectPrimitive.ItemProps
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex-row w-full",
			props.disabled && "opacity-50",
			className,
		)}
		{...props}
	>
		<View className="absolute left-3.5 flex size-3.5 pt-px items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<IconCheck color={colors.primary[500]} width={16} strokeWidth={2} />
			</SelectPrimitive.ItemIndicator>
		</View>
		<SelectPrimitive.ItemText className="text-sm text-gray-500" />
	</SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
	SelectPrimitive.SeparatorRef,
	SelectPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-gray-100", className)}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
	type Option,
};
