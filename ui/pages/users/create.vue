<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { type FetchError } from "ofetch";
  import { array, object, string, type InferType } from "yup";
  import type { SelectOption } from "~/ui/types/SelectOption";
  import { getValidationsFromApiError } from "~/ui/util/ExceptionUtils";

  definePageMeta({ name: "CreateUser" });

  type CreateUserForm = {
    name: string;
    email: string;
    profileIds: Array<string>;
  };

  const schema = object<CreateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
  });

  const toast = useToast();

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
    profileIds: [],
  });

  const form = ref();

  const loading = ref(false);

  watch(status, (value) => {
    loading.value = value === "pending";
  });

  async function onSubmit(event: FormSubmitEvent<CreateUserForm>) {
    try {
      loading.value = true;
      
      await $fetch("/api/users", {
        method: "POST",
        body: event.data,
      });

      toast.add({
        title: "Usuário criado com sucesso",
        color: "emerald",
      });

      state.value = {
        name: "",
        email: "",
        profileIds: [],
      };
    } catch (e) {
      const error = e as FetchError<ApiError>;
      form.value.setErrors(getValidationsFromApiError(error));
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <u-card class="w-10/12">
    <template #header>
      <div class="flex flex-1 align-middle justify-between">
        <p class="text-white align-bottom">Novo Usuário</p>
        <u-button :to="{ name: 'Users' }">Voltar</u-button>
      </div>
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
          name="profileIds"
        >
          <user-profiles-select
            :state="state"
            :loading="loading"
            :userProfileList="userProfileList"
            v-model:profiles="state.profileIds"
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
