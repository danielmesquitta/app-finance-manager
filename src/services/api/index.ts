import type { AuthResponse } from "@/contracts";
import { toast } from "@backpackapp-io/react-native-toast";
import { Mutex } from "async-mutex";
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { nativeApplicationVersion } from "expo-application";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import {
  clearAuthSession,
  getItem,
  setAuthSession,
  StorageKey,
} from "../storage";

const mutex = new Mutex();

function clearSession() {
  clearAuthSession();
  router.push("/");
}

function isTokenExpired(token: string): boolean {
  const payload = jwtDecode<{ exp: number }>(token);
  if (!payload?.exp) return false;
  return payload.exp < Date.now() / 1000;
}

async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  let newAccessToken: string | null = null;
  const release = await mutex.acquire();

  try {
    const response = await axios.post<unknown, AxiosResponse<AuthResponse>>(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    const { data } = response;

    setAuthSession({
      user: data.user,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });

    newAccessToken = data.access_token;
  } catch {
    clearSession();
  } finally {
    release();
  }

  return newAccessToken;
}

async function ensureValidAccessToken(
  token: string,
  refreshToken: string
): Promise<string> {
  let accessToken = token;

  if (isTokenExpired(token) && !isTokenExpired(refreshToken)) {
    if (!mutex.isLocked()) {
      accessToken = (await refreshAccessToken(refreshToken)) ?? accessToken;
    } else {
      await mutex.waitForUnlock();
      accessToken =
        (getItem({ key: StorageKey.TOKEN }) as string) || accessToken;
    }
  }

  return accessToken;
}

// Logging functions for development
function logRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  console.debug(
    `[API Request] method=${config.method} url=${
      config.url
    } params=${JSON.stringify(config.params)} data=${JSON.stringify(
      config.data
    )}`
  );
  return config;
}

function logResponse(response: AxiosResponse): AxiosResponse {
  console.debug(
    `[API Response] status=${response.status} response_data=${JSON.stringify(
      response.data
    )}`
  );
  return response;
}

function logError(error: AxiosError): void {
  console.debug(
    `[API Error] message=${error.message} status=${
      error.response?.status
    } data=${JSON.stringify(error.response?.data)}`
  );
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
    const validToken = await ensureValidAccessToken(token, refreshToken);
    if (validToken) {
      config.headers.Authorization = `Bearer ${validToken}`;
    }
  }

  if (process.env.NODE_ENV === "development") {
    logRequest(config);
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      logResponse(response);
    }
    return response;
  },
  (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      logError(error);
    }
    if (error.response?.status === 401) {
      clearSession();
      toast.error("Sua sessão expirou, por favor, faça login novamente");
      return;
    }
    return Promise.reject(error);
  }
);

function isNotFoundError(error: Error | null): boolean {
  if (!error) return false;

  if (!axios.isAxiosError(error)) return false;

  return error.response?.status === 404;
}

export { api, isNotFoundError };
