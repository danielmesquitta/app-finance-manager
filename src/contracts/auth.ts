import { api } from "@/services";
import type { User } from "@/models";

interface AuthParams {
	token: string;
	provider: "GOOGLE" | "APPLE";
}

interface AuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}

export async function auth({ token, provider }: AuthParams) {
	return api.post<AuthParams, AuthResponse>(
		"/v1/auth/sign-in",
		{ provider },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
}
