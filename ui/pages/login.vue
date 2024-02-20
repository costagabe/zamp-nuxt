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
    if (!state.username) errors.push({ path: "username", message: "Required" });
    if (!state.password) errors.push({ path: "password", message: "Required" });
    console.log(errors);

    return errors;
  };
</script>

<template>
  <UForm
    :validate="validate"
    :state="formState"
    :validate-on="['submit']"
    @submit="onSubmit"
    class="space-y-4"
    ref="form"
  >
    <UFormGroup
      label="Email"
      name="username"
    >
      <UInput
        v-model="formState.username"
        :loading="loading"
      />
    </UFormGroup>

    <UFormGroup
      label="Password"
      name="password"
    >
      <UInput
        v-model="formState.password"
        :loading="loading"
        type="password"
      />
    </UFormGroup>
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
        <NuxtLink
          href="/forgot-password"
          class="text-md text-gray-500 hover:text-blue-500"
        >
          Esqueceu a senha?
        </NuxtLink>
      </div>
    </div>
  </UForm>
</template>
