import type { ApiResponse } from "~/ui/types/ApiResponse";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const authenticated = ref<boolean>(false);
    const token = ref<string | null>(null);

    async function authenticate(username: string, password: string) {
      const { data, error } = await useFetch<any>("/api/auth", {
        body: { username, password },
        method: "POST",
      });

      if (error.value) {
        authenticated.value = false;
        return false;
      }

      authenticated.value = true;

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
