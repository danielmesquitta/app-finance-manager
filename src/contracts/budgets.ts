import type { Budget, Transaction, WithPagination } from "@/models";
import { api } from "@/services";

export const BUDGETS_KEY = "budgets";
export const TRANSACTIONS_BY_CATEGORY_KEY = "transactions-by-category";

interface GetBudgetsParams {
  date?: string;
}

export async function getBudgets({ date }: GetBudgetsParams) {
  const currentDate = new Date();

  return api
    .get<Budget>("/v1/budgets", {
      params: {
        date: date ?? currentDate.toISOString(),
      },
    })
    .then((response) => response.data);
}

interface GetBudgetCategoriesParams {
  categoryId: string;
  date?: string;
}

export async function getBudgetCategories({
  categoryId,
  date,
}: GetBudgetCategoriesParams) {
  const currentDate = new Date();

  return api
    .get<Budget>("/v1/budgets/categories/", {
      params: {
        date: date ?? currentDate.toISOString(),
        categoryId,
      },
    })
    .then((response) => response.data);
}

interface ListBudgetCategoryTransactionsParams {
  date?: string;
  page?: number;
  pageSize?: number;
  categoryId: string;
}

export async function listBudgetCategoryTransactions({
  date,
  page,
  pageSize,
  categoryId,
}: ListBudgetCategoryTransactionsParams) {
  const currentDate = new Date();

  return api
    .get<WithPagination<Transaction>>(
      `/v1/budgets/categories/${categoryId}/transactions`,
      {
        params: {
          date: date ?? currentDate.toISOString(),
          page,
          page_size: pageSize,
        },
      }
    )
    .then((response) => response.data);
}
