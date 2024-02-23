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

    const router = useRouter();

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

    async function logout() {
      await $fetch("/api/auth/logout");
      authenticated.value = false;
      level.value = null;
      router.push("/login");
    }

    return {
      authenticated,
      level,
      token,
      form,
      authenticate,
      logout,
    };
  },
  {
    persist: true,
  }
);
