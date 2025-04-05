import {
  IconArrowNarrowRight,
  IconMathSymbols,
  IconOld,
  IconPigMoney,
  IconShoppingCartDollar,
  IconSquarePercentage,
} from "@/assets/app";
import { HeadNavigation, Text } from "@/components";
import { colors } from "@/styles";
import { type RelativePathString, useRouter } from "expo-router";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";

const data = [
  {
    icon: IconOld,
    path: "retirement",
    title: "Aposentadoria",
    description: "Calcule o valor necessário para uma aposentadoria tranquila.",
  },
  {
    icon: IconPigMoney,
    path: "emergency-reserve",
    title: "Reserva financeira",
    description: "Calcule o valor necessário para uma reserva financeira.",
  },
  {
    icon: IconSquarePercentage,
    path: "simple-interest",
    title: "Juros simples",
    description: "Calcule o valor futuro de uma aplicação com juros simples.",
  },
  {
    icon: IconMathSymbols,
    path: "compound-interest",
    title: "Juros compostos",
    description: "Calcule o valor futuro de uma aplicação com juros compostos.",
  },
  {
    icon: IconShoppingCartDollar,
    path: "cash-vs-installments",
    title: "À vista ou parcelado",
    description: "Compare o valor total de uma compra à vista e parcelada.",
  },
];

export default function Calculators() {
  const { push } = useRouter();

  const { width } = useWindowDimensions();

  const cardWidth = width / 2 - 36;

  return (
    <View className="flex-1">
      <HeadNavigation title="Calculadoras" />

      <View className="flex-1 flex-row p-7 gap-4 flex-wrap">
        {data.map(({ icon: Icon, path, title, description }) => (
          <TouchableOpacity
            key={path}
            style={{ width: cardWidth }}
            onPress={() =>
              push(`/app/more/calculators/${path}` as RelativePathString)
            }
            className="p-4 bg-white rounded-xl"
          >
            <View className="bg-primary-400 rounded-xl size-10 items-center justify-center">
              <Icon color={colors.white} />
            </View>

            <Text className="mt-6 mb-2 text-base font-jakarta-600">
              {title}
            </Text>

            <Text className="text-sm text-gray-400 mb-4">{description}</Text>

            <IconArrowNarrowRight
              color={colors.gray[400]}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
