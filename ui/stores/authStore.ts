export const useAuthStore = defineStore(
  "auth",
  () => {
    const authenticated = ref<boolean>(false);
    const level = ref<number | null>(null);
    const token = ref<string | null>(null);

    const form = ref({
      username: "admin",
      password: "admin",
    });

    async function authenticate(username: string, password: string) {
      const res = await useFetch<any>("/api/auth", {
        body: { username, password },
        method: "POST",
      });

      if (res.error.value) {
        authenticated.value = false;
      } else {
        authenticated.value = true;
      }

      return res;
    }

    return {
      authenticated,
      level,
      token,
      form,
      authenticate,
    };
  },
  {
    persist: true,
  }
);
