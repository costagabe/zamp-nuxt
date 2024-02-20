<script setup lang="ts">
  import type { FormError, FormSubmitEvent } from "#ui/types";

  definePageMeta({ layout: "auth", title: "Login" });

  const authStore = useAuthStore();
  const { form: formState } = storeToRefs(authStore);
  const layoutStore = useLayoutStore();

  const form = ref();
  const router = useRouter();
  const loading = ref(false);

  onMounted(() => {
    layoutStore.title = "Login";
  });

  async function onSubmit(event: FormSubmitEvent<typeof formState.value>) {
    try {
      loading.value = true;

      const res = await authStore.authenticate(event.data.username, event.data.password);

      if (res.error.value) {
        if (res.error.value.statusCode === 500) {
          form.value.setErrors([
            { path: "username", message: "Erro interno do servidor" },
            { path: "password", message: "Erro interno do servidor" },
          ]);
        } else if (res.error.value.statusCode === 401) {
          form.value.setErrors([
            { path: "username", message: "Usuário não encontrado" },
            { path: "password", message: "Senha inválida" },
          ]);
        }
        return;
      }

      await router.push("/");
    } finally {
      loading.value = false;
    }
  }

  const validate = (state: typeof formState.value): FormError[] => {
    const errors = [];
    if (!state.username) errors.push({ path: "username", message: "Campo Obrigatório" });
    if (!state.password) errors.push({ path: "password", message: "Campo Obrigatório" });
    console.log(errors);

    return errors;
  };
</script>

<template>
  <u-form
    :validate="validate"
    :state="formState"
    :validate-on="['submit']"
    @submit="onSubmit"
    class="space-y-4"
    ref="form"
  >
    <u-form-group
      label="Email"
      name="username"
    >
      <u-input
        v-model="formState.username"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      label="Password"
      name="password"
    >
      <u-input
        v-model="formState.password"
        :loading="loading"
        type="password"
      />
    </u-form-group>
    <div>
      <div class="grid grid-rows-2 gap-4">
        <u-button
          block
          class="mt-4"
          :loading="loading"
          type="submit"
        >
          Entrar
        </u-button>
        <nuxt-link
          href="/forgot-password"
          class="text-md text-gray-500 hover:text-blue-500"
        >
          Esqueceu a senha?
        </nuxt-link>
      </div>
    </div>
  </u-form>
</template>
