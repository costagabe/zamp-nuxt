import type { UseFetchOptions } from "nuxt/dist/app/composables";

export const useApiFetch = <T>(endpoint: string, options?: UseFetchOptions<T>) => {
    const authStore = useAuthStore();
    const baseUrl = "http://localhost:8080";
    const headers = options?.headers || ({} as any);

    if (authStore.authenticated && authStore.token) {
        headers["Authorization"] = `Bearer ${authStore.token}`;
    }
    return useFetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
    });
};
