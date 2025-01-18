import { api } from "@/services";
import type { User } from "@/models";
import type { AxiosResponse } from "axios";

interface AuthParams {
	token: string;
	provider: "GOOGLE" | "APPLE" | "MOCK";
}

export interface AuthResponse {
	user: User;
	access_token: string;
	refresh_token: string;
}

export async function auth({ token, provider }: AuthParams) {
	return api.post<AuthParams, AxiosResponse<AuthResponse>>(
		"/v1/auth/sign-in",
		{ provider },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
}
