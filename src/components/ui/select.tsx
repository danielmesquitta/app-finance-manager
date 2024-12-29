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

const SelectValue = forwardRef<
	SelectPrimitive.ValueRef,
	SelectPrimitive.ValueProps
>(({ className, children, ...props }, ref) => {
	const { value } = SelectPrimitive.useRootContext();

	return (
		<SelectPrimitive.Value
			ref={ref}
			className={cn(
				"text-sm",
				value
					? "text-black font-jakarta-600"
					: "text-gray-400 font-jakarta-400",
				className,
			)}
			{...props}
		/>
	);
});

SelectValue.displayName = SelectPrimitive.Value.displayName;

const SelectTrigger = forwardRef<
	SelectPrimitive.TriggerRef,
	SelectPrimitive.TriggerProps
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			"flex-row items-center justify-between h-14 rounded-xl border border-solid border-gray-100 bg-white px-4",
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
							"relative z-50 max-h-96 min-w-[20rem] rounded-xl border border-solid border-gray-100 bg-white py-2",
							className,
						)}
						sideOffset={8}
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
>(({ className, children, ...props }, ref) => {
	const { value } = SelectPrimitive.useRootContext();

	const selected = props.value === value?.value;

	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex-row w-full items-center justify-between py-2 px-8",
				selected && "bg-primary-500",
				props.disabled && "opacity-50",
				className,
			)}
			{...props}
		>
			<View className="absolute left-2 flex size-3.5 pt-px items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<IconCheck color={colors.white} width={14} strokeWidth={3} />
				</SelectPrimitive.ItemIndicator>
			</View>
			<SelectPrimitive.ItemText
				className={cn("text-sm", selected ? "text-white" : "text-gray-500")}
			/>
		</SelectPrimitive.Item>
	);
});

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
