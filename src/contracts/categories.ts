import type { Category } from "@/models";
import { api } from "@/services";

export const CATEGORIES_KEY = "categories";

interface GetCategoriesResponse {
	items: Category[];
}

export async function getCategories() {
	return api
		.get<GetCategoriesResponse>("/v1/categories")
		.then((response) => response.data);
}
