declare module "*.png" {
	import type { ImageSource } from "expo-image";
	const content: ImageSource;
	export default content;
}

declare module "*.jpg" {
	import type { ImageSource } from "expo-image";
	const content: ImageSource;
	export default content;
}

declare module "*.gif" {
	import type { ImageSource } from "expo-image";
	const content: ImageSource;
	export default content;
}

declare module "*.svg" {
	import type React from "react";
	import type { SvgProps } from "react-native-svg";
	const content: React.FC<SvgProps>;
	export default content;
}
