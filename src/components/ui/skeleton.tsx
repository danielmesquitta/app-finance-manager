import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { cn } from "@/utils";
import { type ComponentPropsWithoutRef, useEffect } from "react";

const duration = 1000;

function Skeleton({
	className,
	...props
}: Omit<ComponentPropsWithoutRef<typeof Animated.View>, "style">) {
	const sv = useSharedValue(1);

	useEffect(() => {
		sv.value = withRepeat(
			withSequence(withTiming(0.5, { duration }), withTiming(1, { duration })),
			-1,
		);
	}, [sv]);

	const style = useAnimatedStyle(() => ({
		opacity: sv.value,
	}));

	return (
		<Animated.View
			style={style}
			className={cn("rounded-md bg-gray-200", className)}
			{...props}
		/>
	);
}

export { Skeleton };
