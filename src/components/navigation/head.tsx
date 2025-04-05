import { IconChevronRight } from "@/assets/app";
import { Text } from "@/components/ui";
import { colors } from "@/styles";
import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeadNavigationProps {
  title: string;
  showBackButton?: boolean;
}

export function HeadNavigation({
  title,
  children,
  showBackButton = true,
}: PropsWithChildren<HeadNavigationProps>) {
  const { back } = useRouter();

  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: top + 16 }}
      className="flex-row items-center justify-between bg-white pb-5 px-7 border-b border-solid border-gray-50"
    >
      {showBackButton && (
        <TouchableOpacity
          onPress={back}
          className="p-1.5 bg-gray-50 rounded-xl"
        >
          <IconChevronRight
            width={20}
            color={colors.gray[400]}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
      )}

      <Text className="text-xl font-jakarta-600">{title}</Text>

      {children ?? <View className="size-9" />}
    </View>
  );
}
