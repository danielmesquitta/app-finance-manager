import type { User } from "@/models";
import { MMKV } from "react-native-mmkv";

interface AuthSession {
	user: User;
	accessToken: string;
	refreshToken: string;
}

export const storage = new MMKV();

export enum StorageKey {
	USER = "user",
	TOKEN = "token",
	REFRESH_TOKEN = "refresh-token",
}

interface GetItemParams {
	as?: "string" | "number" | "boolean";
	key: StorageKey;
}

interface SetItemParams {
	key: StorageKey;
	value: boolean | string | number;
}

export function getItem({ as = "string", key }: GetItemParams) {
	if (as === "string") return storage.getString(key);

	if (as === "number") return storage.getNumber(key);

	return storage.getBoolean(key);
}

export function setItem({ key, value }: SetItemParams) {
	return storage.set(key, value);
}

export function clearItem(key: StorageKey) {
	return storage.delete(key);
}

export function getUser() {
	const value = getItem({ key: StorageKey.USER });

	if (!value) return null;

	return JSON.parse(value as string) as User;
}

export function setAuthSession({
	user,
	accessToken,
	refreshToken,
}: AuthSession) {
	setItem({ key: StorageKey.USER, value: JSON.stringify(user) });
	setItem({ key: StorageKey.TOKEN, value: accessToken });
	setItem({ key: StorageKey.REFRESH_TOKEN, value: refreshToken });
}

export function clearAuthSession() {
	clearItem(StorageKey.USER);
	clearItem(StorageKey.TOKEN);
	clearItem(StorageKey.REFRESH_TOKEN);
}
