export const useAuthStore = defineStore(
  "auth",
  () => {
    const authenticated = ref<boolean>(false);
    const token = ref<string | null>(null);

    const errors = ref({
      username: "",
      password: "",
    });

    const form = ref({
      username: "admin",
      password: "admin",
    });

    async function authenticate(username: string, password: string) {
      const { error } = await useFetch<any>("/api/auth", {
        body: { username, password },
        method: "POST",
      });

      if (error.value) {
        console.log("error", error.value);
        if (error.value.statusCode === 500) {
          errors.value.username = "Erro interno do servidor";
          errors.value.password = "Erro interno do servidor";
        } else if (error.value.statusCode === 401) {
          errors.value.username = "Usuário não encontrado";
          errors.value.password = "Senha inválida";
        }
        authenticated.value = false;
        return false;
      }

      authenticated.value = true;

      return true;
    }

    return {
      authenticated,
      token,
      errors,
      form,
      authenticate,
    };
  },
  {
    persist: true,
  }
);
