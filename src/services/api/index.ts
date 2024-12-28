import axios, { type AxiosResponse, type AxiosError } from "axios";
import { nativeApplicationVersion } from "expo-application";
import {
	clearAuthSession,
	getItem,
	setAuthSession,
	StorageKey,
} from "../storage";
import { Mutex } from "async-mutex";
import { router } from "expo-router";
import { toast } from "@backpackapp-io/react-native-toast";
import { jwtDecode } from "jwt-decode";
import type { AuthResponse } from "@/contracts";

const mutex = new Mutex();

function clearSession() {
	clearAuthSession();

	router.push("/");
}

const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		appVersion: nativeApplicationVersion,
	},
});

api.interceptors.request.use(async (config) => {
	const token = getItem({ key: StorageKey.TOKEN }) as string;
	const refreshToken = getItem({ key: StorageKey.REFRESH_TOKEN }) as string;

	await mutex.waitForUnlock();

	if (token && refreshToken) {
		let accessToken = token;

		const accessTokenPayload = jwtDecode(token);
		const refreshTokenPayload = jwtDecode(refreshToken);

		if (accessTokenPayload.exp && refreshTokenPayload.exp) {
			const isAccessTokenExpired = accessTokenPayload.exp < Date.now() / 1000;
			const isRefreshTokenExpired = refreshTokenPayload.exp < Date.now() / 1000;

			if (isAccessTokenExpired && !isRefreshTokenExpired) {
				if (!mutex.isLocked()) {
					const release = await mutex.acquire();

					await axios
						.post<unknown, AxiosResponse<AuthResponse>>(
							`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
							{
								headers: {
									Authorization: `Bearer ${refreshToken}`,
								},
							},
						)
						.then(({ data }) => {
							setAuthSession({
								user: data.user,
								accessToken: data.access_token,
								refreshToken: data.refresh_token,
							});

							accessToken = data.access_token;
						})
						.catch(() => clearSession())
						.finally(() => release());
				} else {
					await mutex.waitForUnlock();
				}
			}
		}

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			clearSession();

			toast.error("Sua sessão expirou, por favor, faça login novamente");

			return;
		}

		return Promise.reject(error);
	},
);

export { api };
