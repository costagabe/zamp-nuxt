<script setup lang="ts">
  import type { ApiResponse } from "~/ui/types/ApiResponse";

  definePageMeta({ layout: "auth", title: "Login" });

  const authStore = useAuthStore();
  const { errors, form } = storeToRefs(authStore);
  const layoutStore = useLayoutStore();
  onMounted(() => {
    layoutStore.title = "Login";
  });

  watch(
    () => form.value.username,
    () => {
      errors.value.username = "";
    }
  );
  watch(
    () => form.value.password,
    () => (errors.value.password = "")
  );

  const router = useRouter();

  async function handleSubmit() {
    const isAuthSuccessfull = await authStore.authenticate(form.value.username, form.value.password);

    if (!isAuthSuccessfull) {
      return;
    }
    await router.push("/");
  }
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="grid grid-rows-3 gap-6"
  >
    <text-input
      v-model:value="form.username"
      :error-message="errors.username"
      label="Usuário"
    />
    <text-input
      v-model:value="form.password"
      :error-message="errors.password"
      label="Senha"
      type="password"
    />
    <div>
      <div class="grid grid-rows-2 gap-4">
        <button
          class="btn btn-primary hover:btn-active text-white font-bold w-full rounded"
          type="submit"
        >
          Entrar
        </button>
        <NuxtLink
          href="/forgot-password"
          class="text-md text-gray-500 hover:text-blue-500"
        >
          Esqueceu a senha?
        </NuxtLink>
      </div>
    </div>
  </form>
</template>
