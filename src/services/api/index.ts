import axios from "axios";
import { nativeApplicationVersion } from "expo-application";
import { getItem, StorageKey } from "../storage";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		appVersion: nativeApplicationVersion,
	},
});

api.interceptors.request.use((config) => {
	const token = getItem({ key: StorageKey.TOKEN });
	const refreshToken = getItem({ key: StorageKey.REFRESH_TOKEN });

	if (token && refreshToken) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(async (response) => {
	console.log({ status: response.status });

	return response;
});

export { api };
