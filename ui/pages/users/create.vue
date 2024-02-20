<script setup lang="ts">
  import type { SelectOption } from "~/ui/types/SelectOption";
  import type { FormError, FormSubmitEvent } from "#ui/types";
  import { object, string, type InferType } from "yup";
  import { type FetchError } from "ofetch";
  import { getValidationsFromApiError } from "~/ui/util/ExceptionUtils";

  definePageMeta({ name: "CreateUser" });

  type CreateUserForm = {
    name: string;
    email: string;
    profileId: string;
  };

  const schema = object<CreateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileId: string().uuid("Campo inválido").required("Campo Obrigatório"),
  });

  type Schema = InferType<typeof schema>;

  const { data: userProfileList, status } = useAsyncData(
    "userProfileSelectList",
    () => $fetch<Array<SelectOption>>("/api/user-profiles/select-list"),
    {
      default: () => [],
    }
  );

  const state = ref<CreateUserForm>({
    name: "",
    email: "",
    profileId: "",
  });

  const form = ref();

  const loading = ref(false);

  watch(status, (status) => {
    loading.value = status === "pending";
  });

  async function onSubmit(event: FormSubmitEvent<CreateUserForm>) {
    try {
      loading.value = true;
      const user = await $fetch("/api/users", {
        method: "POST",
        body: event.data,
      });

      console.log(user);

      // if (res.error.value) {
      //   if (res.error.value.statusCode === 500) {
      //     form.value.setErrors([
      //       { path: "email", message: "Erro interno do servidor" },
      //       { path: "name", message: "Erro interno do servidor" },
      //       { path: "profileId", message: "Erro interno do servidor" },
      //     ]);
      //   } else if (res.error.value.statusCode === 403) {
      //     form.value.setErrors([{ path: "profileId", message: "Você não possui nível para esta ação" }]);
      //   }
      //   return;
      // }
    } catch (e) {
      const error = e as FetchError<ApiError>;
      form.value.setErrors(getValidationsFromApiError(error));
      console.log(getValidationsFromApiError(error));
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <u-card class="w-10/12">
    <template #header>
      <p class="text-white align-bottom">Novo Usuário</p>
    </template>

    <template #default>
      <u-form
        :schema="schema"
        :state="state"
        :validate-on="['submit']"
        @submit="onSubmit"
        class="space-y-4"
        ref="form"
      >
        <u-form-group
          label="Nome Completo"
          name="name"
        >
          <u-input
            v-model="state.name"
            :loading="loading"
          />
        </u-form-group>

        <u-form-group
          label="E-mail"
          name="email"
        >
          <u-input
            v-model="state.email"
            :loading="loading"
          />
        </u-form-group>

        <u-form-group
          label="Perfil"
          name="profileId"
        >
          <u-select-menu
            v-model="state.profileId"
            :loading="loading"
            :options="userProfileList"
            :search-attributes="['label']"
            option-attribute="label"
            value-attribute="value"
            placeholder="Perfil do Usuário"
            searchable
            searchable-placeholder="Procurar perfil"
          />
        </u-form-group>
        <u-button
          block
          class="mt-4"
          type="submit"
          :loading="loading"
        >
          Criar Usuário
        </u-button>
      </u-form>
    </template>
  </u-card>
</template>
