export interface User {
	id: string;
	tier: string;
	name: string;
	email: string;
	avatar: string;
	provider: string;
	updated_at: string;
	created_at: string;
	external_id: string;
	verified_email: boolean;
	synchronized_at: string;
	subscription_expires_at: string;
}
