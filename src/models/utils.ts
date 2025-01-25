export interface WithPagination<T> {
	page: number;
	items: T[] | null;
	page_size: number;
	total_items: number;
	total_pages: number;
}
