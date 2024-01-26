import type { ApiResponse } from "~/ui/types/ApiResponse";

export const useAuthStore = defineStore(
    "auth",
    () => {
        const authenticated = ref<boolean>(true);
        const token = ref<string | null>(null);

        async function authenticate(username: string, password: string) {
            const { data, error } = await useApiFetch<any>("/auth", {
                body: { username, password },
                method: "POST",
            });

            if (error.value) {
                authenticated.value = false;
                return false;
            }

            authenticated.value = true;
            token.value = data.value?.token;

            return true;
        }

        return {
            authenticated,
            token,
            authenticate,
        };
    },
    { persist: true }
);
