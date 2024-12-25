import type { User } from "@/models";
import { api } from "@/services";
import type { AxiosResponse } from "axios";

export const USER_PROFILE_QUERY_KEY = "user-profile";

export function getUserProfile() {
	return api.get<AxiosResponse<User>>("/v1/users/profile");
}
