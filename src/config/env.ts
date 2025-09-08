// Docs get value .env: https://nextjs.org/docs/pages/guides/environment-variables
import { getEnv, getEnvServer } from "~/utils/env";
// Environment detection
const e = getEnv("APP_ENV", "development");
export const ENVIRONMENT = {
    APP_ENV: e,
    isDEV: e === "development",
    isProd: e === "production",
} as const;

// API Configuration
export const API = {
    VERSION_PATH: "/api/v1",
    BASE_URL: getEnv("API_URL", "http://localhost:8000"),
} as const;

// Application URLs
export const APP = {
    URL: getEnvServer("APP_URL", "http://localhost:3000"),
    API: {
        ROOT: API.BASE_URL,
        FULL_URL: `${API.BASE_URL}${API.VERSION_PATH}`,
    },
} as const;
