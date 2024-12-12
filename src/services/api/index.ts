import axios from "axios";

import { nativeApplicationVersion } from "expo-application";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    appVersion: nativeApplicationVersion,
  },
});

export { api };
