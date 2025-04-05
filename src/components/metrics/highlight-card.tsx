import { IconTrendingDown, IconTrendingUp } from "@/assets/app/icons";
import { Skeleton, Text } from "@/components/ui";
import { colors } from "@/styles";
import { cn, formatDate } from "@/utils";
import { masks } from "@/utils/masks";
import { subMonths } from "date-fns";
import type { FC } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";

interface HighlightCardProps {
  icon: FC<SvgProps>;
  title: string;
  value?: number;
  currentDate?: Date;
  percentageVariation?: number;
  showNegativeVariation?: boolean;
}

export function HighlightCard({
  icon: Icon,
  title,
  value,
  currentDate = new Date(),
  percentageVariation,
  showNegativeVariation = true,
}: HighlightCardProps) {
  const previousMonth = formatDate({
    date: subMonths(currentDate, 1),
    mask: "MMMM",
  });

  return (
    <View className="border border-solid border-gray-100 rounded-xl flex-1">
      <View className="bg-gray-50 rounded-t-xl py-3 px-4 flex-row items-center gap-3">
        <View className="p-1.5 bg-white rounded-xl">
          <Icon width={16} height={16} color={colors.green[500]} />
        </View>

        <Text className="text-sm font-jakarta-500 text-black">{title}</Text>
      </View>

      <View className="py-3 px-4 gap-1">
        <View className="flex-row items-end gap-1">
          <Text className="text-base text-gray-400">R$</Text>

          {value !== undefined ? (
            <Text className="text-2xl font-jakarta-600 text-black">
              {masks.currencyWithoutSymbol(showNegativeVariation ? value : 0)}
            </Text>
          ) : (
            <Skeleton className="w-28 h-6" />
          )}
        </View>

        <View className="flex-row items-center">
          {percentageVariation !== undefined ? (
            <>
              {percentageVariation > 0 ? (
                <IconTrendingUp
                  width={16}
                  height={16}
                  color={colors.green[500]}
                />
              ) : (
                <IconTrendingDown
                  width={16}
                  height={16}
                  color={colors.red[500]}
                />
              )}

              <Text
                className={cn(
                  "text-sm ml-2 mr-1",
                  percentageVariation > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {percentageVariation > 0 ? "+" : ""}
                {percentageVariation / 100}%
              </Text>

              <Text className="text-sm text-gray-400">que {previousMonth}</Text>
            </>
          ) : (
            <Skeleton className="w-28 h-6" />
          )}
        </View>
      </View>
    </View>
  );
}
