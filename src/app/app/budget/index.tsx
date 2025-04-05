import {
  IconChartBar,
  IconChevronRight,
  IconCircleCheck,
  IconCoins,
  IconSettings,
  IconToolsKitchen2,
} from "@/assets/app";
import {
  BudgetCard,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HeadNavigation,
  HighlightCard,
  Skeleton,
  Text,
} from "@/components";
import {
  BUDGETS_KEY,
  getBudgets,
  listBudgetCategoryTransactions,
  TRANSACTIONS_BY_CATEGORY_KEY,
} from "@/contracts";
import { isNotFoundError } from "@/services";
import { colors } from "@/styles";
import { cn, masks } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface TransactionsDialogProps {
  categoryId: string;
}

export function TransactionsDialog({ categoryId }: TransactionsDialogProps) {
  const { data: transactions } = useQuery({
    queryFn: () => listBudgetCategoryTransactions({ categoryId }),
    enabled: !!categoryId,
    queryKey: [TRANSACTIONS_BY_CATEGORY_KEY, categoryId],
  });

  return (
    <View className="bg-gray-50 p-7 gap-7">
      {transactions ? (
        transactions.items ? (
          <Text className="text-sm text-gray-500">
            {transactions.total_items.toString().padStart(2, "0")} transaç
            {transactions.total_items === 1 ? "ão" : "ões"}
          </Text>
        ) : null
      ) : (
        <Skeleton className="w-full h-5" />
      )}

      {!transactions &&
        Array.from({ length: 4 }).map((_) => (
          <Skeleton key={Math.random()} className="w-full h-11" />
        ))}

      {transactions?.items?.map(
        ({ id, name, amount, institution_logo, payment_method_name }) => (
          <View key={id} className="flex-row justify-between items-center">
            <View className="gap-1">
              <Text className="text-sm text-black font-jakarta-600">
                {name}
              </Text>

              <View className="flex-row items-center gap-3">
                <Text className="text-xs text-gray-500">
                  {payment_method_name}
                </Text>

                <View className="size-2 rounded-full bg-gray-100" />

                <Image
                  style={{ width: 24, height: 24 }}
                  source={{ uri: institution_logo }}
                  className="rounded-lg object-cover"
                />
              </View>
            </View>

            <View className="flex-row gap-2 items-center">
              <Text className="text-sm text-gray-400">R$</Text>

              <Text className="text-sm text-red-500 font-jakarta-600">
                {masks.currencyWithoutSymbol(amount / 100)}
              </Text>
            </View>
          </View>
        )
      )}
    </View>
  );
}

export default function BudgetPage() {
  const router = useRouter();

  const { data: budgets, error } = useQuery({
    queryFn: () => getBudgets({}),
    queryKey: [BUDGETS_KEY],
  });

  useEffect(() => {
    if (isNotFoundError(error)) {
      router.push("/app/budget/edit");
    }
  }, [error, router]);

  const categories = budgets?.budget_categories
    ? budgets.budget_categories.map(({ amount, category }) => {
        return {
          name: category.name,
          color: "#F00",
          percentage: (amount / budgets.amount) * 100,
        };
      })
    : [];

  const sumCategoriesPercentage = categories.reduce(
    (acc, { percentage }) => acc + percentage,
    0
  );

  return (
    <View className="flex-1">
      <HeadNavigation title="Orçamento" showBackButton={false}>
        <Link href="/app/budget/edit" asChild>
          <TouchableOpacity className="p-2 rounded-xl bg-gray-50">
            <IconSettings width={20} height={20} color={colors.black} />
          </TouchableOpacity>
        </Link>
      </HeadNavigation>

      <ScrollView className="flex-1">
        <View className="bg-white p-7 items-center">
          <View className="flex-row items-center gap-2">
            <IconCircleCheck color={colors.green[500]} width={16} height={16} />

            <Text className="text-sm font-jakarta-500 text-green-500">
              Orçamento
            </Text>
          </View>

          <View className="flex-row items-end gap-2 my-2">
            <Text className="text-xl text-gray-400">R$</Text>

            {budgets?.spent !== undefined ? (
              <Text className="text-3xl font-jakarta-600 text-black">
                {masks.currencyWithoutSymbol(budgets.spent)}
              </Text>
            ) : (
              <Skeleton className="w-40 h-8" />
            )}
          </View>

          {budgets?.amount !== undefined ? (
            <Text className="text-gray-400">
              / R$ {masks.currencyWithoutSymbol(budgets.amount)}
            </Text>
          ) : (
            <Skeleton className="w-40 h-6" />
          )}

          <View className="items-center gap-2 w-full mt-8">
            <View className="w-full h-2 flex-row items-center rounded-full bg-gray-100">
              {categories.map(({ name, color, percentage }, index) => (
                <View
                  key={name}
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                  className={cn(
                    "h-full",
                    index === 0 && "rounded-l-full",
                    index === categories.length - 1 && "rounded-r-full"
                  )}
                />
              ))}
            </View>

            <View
              style={{
                left: `${
                  sumCategoriesPercentage === 100 ? 98 : sumCategoriesPercentage
                }%`,
              }}
              className="p-1 bg-white rounded-full absolute -top-1.5"
            >
              <View className="size-3 rounded-full bg-black" />
            </View>

            <View className="flex-row w-full items-center gap-2 justify-between">
              <Text className="text-xs text-gray-400">0%</Text>

              <Text className="text-xs text-gray-400">100%</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4 w-full mt-8">
            <HighlightCard
              icon={IconCoins}
              title="Disponível"
              value={budgets?.available}
              percentageVariation={budgets?.available_percentage_variation}
            />

            <HighlightCard
              icon={IconChartBar}
              title="Média por dia"
              value={budgets?.available_per_day}
              percentageVariation={
                budgets?.available_per_day_percentage_variation
              }
              showNegativeVariation={false}
            />
          </View>
        </View>

        <View className="p-7 flex-1 gap-4">
          {budgets?.budget_categories.map(
            ({ id, spent, amount, available, category }) => {
              const percentage = (spent / amount) * 100;

              const payload = {
                icon: IconToolsKitchen2,
                title: category.name,
                color: colors.primary[500],
              };

              return (
                <Dialog key={id}>
                  <DialogTrigger asChild>
                    <TouchableOpacity className="p-5 gap-4 rounded-xl bg-white">
                      <BudgetCard.Details {...payload} budget={amount}>
                        <View className="ml-auto p-2 rounded-xl border border-solid border-gray-50">
                          <IconChevronRight
                            color={colors.black}
                            width={16}
                            height={16}
                          />
                        </View>
                      </BudgetCard.Details>

                      <BudgetCard.Bar
                        color={payload.color}
                        percentage={percentage}
                      />

                      <BudgetCard.Remaining
                        spent={spent}
                        remaining={available}
                      />
                    </TouchableOpacity>
                  </DialogTrigger>

                  <DialogContent isBottomSheet>
                    <DialogHeader>
                      <DialogTitle>Detalhes</DialogTitle>
                    </DialogHeader>

                    <View className="p-7 gap-5">
                      <BudgetCard.Details {...payload} budget={amount} />

                      <BudgetCard.Bar
                        color={payload.color}
                        percentage={percentage}
                      />

                      <BudgetCard.Remaining
                        spent={spent}
                        remaining={available}
                      />
                    </View>

                    <TransactionsDialog categoryId={category.id} />
                  </DialogContent>
                </Dialog>
              );
            }
          )}

          {!budgets && (
            <View className="flex-1 gap-4">
              {Array.from({ length: 4 }).map((_) => (
                <Skeleton key={Math.random()} className="w-full h-36" />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
