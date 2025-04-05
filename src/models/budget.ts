import type { Category } from "./category";
import type { ComparisonDate } from "./comparison_date";

export interface BudgetCategory {
  id: string;
  spent: number;
  amount: number;
  category: Category;
  available: number;
  budget_id: string;
  updated_at: string;
  created_at: string;
  category_id: string;
}

export interface Budget {
  id: string;
  date: string;
  spent: number;
  amount: number;
  user_id: string;
  available: number;
  created_at: string;
  updated_at: string;
  comparison_dates: ComparisonDate;
  available_per_day: number;
  budget_categories: BudgetCategory[];
  available_percentage_variation: number;
  available_per_day_percentage_variation: number;
}
