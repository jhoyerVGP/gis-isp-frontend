import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosClient } from "./axiosClient";
import { refreshTokenService } from "@/features/auth/auth.service";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const SKIP_REFRESH = [
  "/auth/refresh",
  "/auth/login",
  "/api/account/email-change/confirm",
  "/auth/2fa/verify",
];

let isRefreshing = false;
let failedQueue: { resolve: () => void; reject: (e: unknown) => void }[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(),
  );
  failedQueue = [];
};

export const setupAuthInterceptor = (onAuthFailure: () => void) => {
  axiosClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as RetryConfig | undefined;

      if (
        !original ||
        error.response?.status !== 401 ||
        original._retry ||
        SKIP_REFRESH.some((u) => original.url?.includes(u))
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosClient(original));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        await refreshTokenService();
        processQueue();
        return axiosClient(original);
      } catch (refreshError) {
        processQueue(refreshError);
        onAuthFailure();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
};
