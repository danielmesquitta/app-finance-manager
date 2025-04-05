import {
  CalculatorFeedbackBackground,
  IconArrowNarrowRight,
  IconCalendarDue,
  IconCoins,
  IconCreditCard,
  IconFriends,
  IconHelpCircle,
  IconOld,
  IconTargetArrow,
  IconWallet,
} from "@/assets/app";
import { Button, LineChart, Text } from "@/components";
import { getUser } from "@/services";
import { useCalculatorStore } from "@/store";
import { colors } from "@/styles";
import { cn, masks } from "@/utils";
import { useRouter } from "expo-router";
import { type FC, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { SvgProps } from "react-native-svg";

interface FeedbackItemProps {
  icon: FC<SvgProps>;
  type?: "RED" | "GRAY" | "GREEN";
  title: string;
  help?: string;
  value: string;
}

function FeedbackItem({
  icon: Icon,
  type = "GRAY",
  help,
  title,
  value,
}: FeedbackItemProps) {
  const iconColor = {
    RED: colors.red[500],
    GRAY: colors.gray[400],
    GREEN: colors.green[500],
  };

  return (
    <View className="flex-row items-center gap-4">
      <View
        className={cn(
          "p-2 rounded-lg border border-solid",
          type === "RED" && "bg-red-500/5 border-red-500/10",
          type === "GRAY" && "bg-gray-50 border-gray-50",
          type === "GREEN" && "bg-green-500/5 border-green-500/10"
        )}
      >
        <Icon width={24} color={iconColor[type]} />
      </View>

      <View className="gap-1">
        <Text className="text-sm text-gray-400">{title}</Text>
        <Text
          className={cn(
            "text-black font-jakarta-600",
            type !== "GREEN" && "text-base"
          )}
        >
          {value}
        </Text>
      </View>

      {help && (
        <TouchableOpacity className="p-1.5 rounded-lg border border-solid border-gray-100 ml-auto">
          <IconHelpCircle width={16} color={colors.gray[500]} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function FeedbackHeader() {
  const user = getUser();

  const { type, data } = useCalculatorStore();

  if (!user) return null;

  return (
    <View className="px-8">
      {type === "RETIREMENT" && (
        <Text className="text-center text-2xl font-jakarta-600 text-gray-500">
          <Text className="text-black text-2xl font-jakarta-600">
            Parabéns {user.name.split(" ")[0]}!
          </Text>{" "}
          Você atingiu sua meta de aposentadoria com os investimentos atuais.
        </Text>
      )}

      {(type === "SIMPLE_INTEREST" || type === "COMPOUND_INTEREST") && (
        <>
          <Text className="text-center text-sm text-gray-400">
            Valor total final
          </Text>

          <Text className="text-2xl mt-1 text-center font-jakarta-600 text-black">
            {masks.currency(data.total_amount)}
          </Text>
        </>
      )}

      {type === "EMERGENCY_RESERVE" && (
        <>
          <Text className="text-center text-sm text-gray-400">
            Reserva financeira
          </Text>

          <Text className="text-2xl mt-1 text-center font-jakarta-600 text-black">
            {masks.currency(data.recommended_reserve_in_value)}
          </Text>
        </>
      )}

      {type === "CASH_VS_INSTALLMENTS" && (
        <>
          <Text className="text-center text-sm text-gray-400">
            O pagamento é melhor feito:
          </Text>

          <Text className="text-2xl mt-1 text-center font-jakarta-600 text-black capitalize">
            {data.savings_with_credit_card > data.savings_with_cash
              ? "A prazo"
              : "À vista"}
          </Text>
        </>
      )}
    </View>
  );
}

export default function Feedback() {
  const { push, back } = useRouter();

  const { type, data } = useCalculatorStore();

  const resultFields = useMemo(() => {
    if (type === "RETIREMENT") {
      return {
        title: "Resultados",
        fields: [
          {
            icon: IconOld,
            value: masks.currency(data.max_monthly_expenses),
            title: "Você poderá gastar por mês:",
          },
          {
            icon: IconFriends,
            type: data.heritage > 0 ? "GRAY" : "RED",
            value:
              data.heritage > 0
                ? masks.currency(data.heritage)
                : "Não haverá herança",
            title: "Deixará de herança:",
          },
          {
            icon: IconTargetArrow,
            value: masks.currency(
              data.exceeded_goal_amount > 0 ? data.exceeded_goal_amount : 0
            ),
            title: "Você ultrapassou da sua meta:",
          },
        ] satisfies FeedbackItemProps[],
      };
    }

    if (type === "SIMPLE_INTEREST" || type === "COMPOUND_INTEREST") {
      return {
        title: "Valores:",
        fields: [
          {
            icon: IconWallet,
            value: masks.currency(data.total_deposit),
            title:
              type === "SIMPLE_INTEREST"
                ? "Valor inicial:"
                : "Valor total investido:",
          },
          {
            icon: IconCreditCard,
            value: masks.currency(data.total_interest),
            title: "Total em juros:",
          },
        ] satisfies FeedbackItemProps[],
      };
    }

    if (type === "EMERGENCY_RESERVE") {
      return {
        title: "Para isso, você precisará seguir o plano abaixo:",
        fields: [
          {
            icon: IconWallet,
            value: masks.currency(data.monthly_income),
            title: "Salário:",
          },
          {
            icon: IconCreditCard,
            value: masks.currency(data.monthly_expenses),
            title: "Custo fixo:",
          },
          {
            icon: IconCoins,
            value: `${data.monthly_savings_percentage}%`,
            title: "Poupança mensal:",
          },
          {
            icon: IconCalendarDue,
            value: `${data.recommended_reserve_in_months} meses`,
            title: "Período de reserva recomendado:",
          },
        ] satisfies FeedbackItemProps[],
      };
    }

    if (type === "CASH_VS_INSTALLMENTS") {
      return {
        title: "Resultados",
        fields: [
          {
            icon: IconWallet,
            value: masks.currency(data.savings_with_cash),
            title: "Pagando à vista, você terá o que comprou e mais:",
          },
          {
            icon: IconCreditCard,
            value: masks.currency(data.savings_with_credit_card),
            title: "Pagando a prazo, você terá o que comprou e mais:",
          },
        ],
      };
    }

    return {
      title: null,
      fields: [],
    };
  }, [data, type]);

  const lineChartData = useMemo(() => {
    if (type === "CASH_VS_INSTALLMENTS") {
      const params = {
        x: Object.keys(data.cash_flow_by_month).map((month) => Number(month)),
        y: Object.values(data.cash_flow_by_month).map(
          ({ credit_card }) => credit_card
        ),
        y2: Object.values(data.cash_flow_by_month).map(({ cash }) => cash),
        subtitles: { y: "A prazo", y2: "À vista" },
      };

      return params;
    }

    if (type === "SIMPLE_INTEREST" || type === "COMPOUND_INTEREST") {
      const params = {
        x: Object.keys(data.by_month).map((month) => Number(month)),
        y: Object.values(data.by_month).map(
          ({ total_deposit }) => total_deposit
        ),
      };

      if (type === "SIMPLE_INTEREST") return params;

      return {
        ...params,
        y2: Object.values(data.by_month).map(
          ({ total_amount }) => total_amount
        ),
        subtitles: { y: "Valor investido", y2: "Rentabilidade" },
      };
    }

    return null;
  }, [type, data]);

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <CalculatorFeedbackBackground style={{ position: "absolute" }} />

        <View className="flex-1 px-7 pb-7 pt-64 gap-7">
          <FeedbackHeader />

          {type === "RETIREMENT" && (
            <View className="bg-white p-4 rounded-xl">
              <FeedbackItem
                icon={IconWallet}
                type="GREEN"
                title="Você se aposentará com:"
                value={masks.currency(data.property_on_retirement)}
              />
            </View>
          )}

          <View className="bg-white p-4 rounded-xl">
            {resultFields.title && (
              <Text className="text-sm text-gray-400 font-jakarta-500 mb-5">
                {resultFields.title}
              </Text>
            )}

            {resultFields.fields.map((field, index) => (
              <View key={field.title}>
                {index !== 0 && (
                  <View className="h-px bg-gray-50 w-full my-5" />
                )}

                <FeedbackItem {...field} />
              </View>
            ))}
          </View>

          {(type === "SIMPLE_INTEREST" ||
            type === "COMPOUND_INTEREST" ||
            type === "CASH_VS_INSTALLMENTS") && (
            <View className="bg-white p-4 rounded-xl">
              <Text className="text-sm text-gray-400 font-jakarta-500 mb-5">
                {type === "CASH_VS_INSTALLMENTS"
                  ? "Fluxo de caixa projetado:"
                  : "Gráfico:"}
              </Text>

              {lineChartData && <LineChart {...lineChartData} height={232} />}
            </View>
          )}
        </View>
      </ScrollView>

      <View className="flex-row justify-end items-center gap-4 bg-white w-full py-4 px-7">
        <Button variant="gray" onPress={back}>
          <Text>Calcular novamente</Text>
        </Button>

        <Button variant="black" onPress={() => push("/app/more/calculators")}>
          <Text>Finalizar</Text>

          <IconArrowNarrowRight color={colors.white} />
        </Button>
      </View>
    </View>
  );
}
