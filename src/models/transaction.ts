export interface Transaction {
	id: string;
	name: string;
	date: string;
	amount: number;
	user_id: string;
	account_id: string;
	created_at: string;
	updated_at: string;
	is_ignored: boolean;
	deleted_at: string;
	external_id: string;
	category_id: string;
	category_name: string;
	institution_id: string;
	institution_logo: string;
	institution_name: string;
	payment_method_id: string;
	payment_method_name: string;
}
