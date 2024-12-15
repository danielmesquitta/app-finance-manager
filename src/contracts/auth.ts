import { api } from "@/services";
import type { User } from "@/models";
import type { AxiosResponse } from "axios";

interface AuthParams {
	token: string;
	provider: "GOOGLE" | "APPLE";
}

export interface AuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
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
