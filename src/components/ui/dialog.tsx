import * as DialogPrimitive from "@rn-primitives/dialog";
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { IconX } from "@/assets/app";
import { cn } from "@/utils";
import { forwardRef, type ReactNode } from "react";
import { colors } from "@/styles";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
	DialogPrimitive.OverlayRef,
	DialogPrimitive.OverlayProps
>(({ className, children, ...props }, ref) => {
	return (
		<DialogPrimitive.Overlay
			ref={ref}
			style={StyleSheet.absoluteFill}
			className={cn(
				"flex bg-black/80 justify-center items-center p-2",
				className,
			)}
			{...props}
		>
			<Animated.View
				exiting={FadeOut.duration(150)}
				entering={FadeIn.duration(150)}
			>
				{children as ReactNode}
			</Animated.View>
		</DialogPrimitive.Overlay>
	);
});

DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef<
	DialogPrimitive.ContentRef,
	DialogPrimitive.ContentProps & {
		portalHost?: string;
		isBottomSheet?: boolean;
		hasCloseButton?: boolean;
	}
>(
	(
		{
			className,
			children,
			portalHost,
			isBottomSheet,
			hasCloseButton = true,
			...props
		},
		ref,
	) => {
		return (
			<DialogPortal hostName={portalHost}>
				<DialogOverlay
					className={cn(isBottomSheet && "justify-end")}
					closeOnPress={hasCloseButton}
				>
					<DialogPrimitive.Content
						ref={ref}
						className={cn("max-w-lg gap-4 bg-white p-6 rounded-lg", className)}
						{...props}
					>
						{isBottomSheet && (
							<View className="w-9 h-1 absolute top-2 rounded-full bg-gray-400" />
						)}

						{children}

						{hasCloseButton && (
							<DialogPrimitive.Close className="absolute right-4 top-4 p-0.5 rounded-sm opacity-70">
								<IconX color={colors.gray[400]} width={16} />
							</DialogPrimitive.Close>
						)}
					</DialogPrimitive.Content>
				</DialogOverlay>
			</DialogPortal>
		);
	},
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: ViewProps) => (
	<View className={cn("flex-col gap-1.5 text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: ViewProps) => (
	<View className={cn("flex-row justify-end gap-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
	DialogPrimitive.TitleRef,
	DialogPrimitive.TitleProps
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn("text-lg text-black font-jakarta-600", className)}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
	DialogPrimitive.DescriptionRef,
	DialogPrimitive.DescriptionProps
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-gray-500 font-jakarta-400", className)}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
