<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { type FetchError } from "ofetch";
  import { array, object, string } from "yup";
  import { useUserProfileStore } from "~/ui/stores/userProfileStore";
  import { getValidationsFromApiError } from "~/ui/util/ExceptionUtils";

  type CreateUserForm = {
    name: string;
    email: string;
    profileIds: Array<string>;
  };

  definePageMeta({ name: "CreateUser" });

  const toast = useToast();

  const state = ref<CreateUserForm>({
    name: "",
    email: "",
    profileIds: [],
  });

  const form = ref();

  const { loading } = storeToRefs(useAppStore());

  const { userProfileList } = storeToRefs(useUserProfileStore());

  const schema = object<CreateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
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
  <crud-create-and-update
    v-model:state="state"
    :title="`Criar Usuário`"
    :schema="schema"
    :loading="loading"
    @submit="onSubmit"
    backRoute="Users"
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
        v-model:profiles="state.profileIds"
        v-model:user-profile-list="userProfileList"
        :loading="loading"
      />
    </u-form-group>
  </crud-create-and-update>
</template>
