<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { type FetchError } from "ofetch";
  import { number, object, string } from "yup";
  import { getValidationsFromApiError } from "~/ui/util/ExceptionUtils";

  type UpdateUserForm = {
    id: string;
    name: string;
    level: number;
  };

  definePageMeta({ name: "UpdateUserProfile" });

  const defaultState: UpdateUserForm = {
    id: "",
    name: "",
    level: 0,
  };

  const state = ref<UpdateUserForm>({ ...defaultState });

  const { loading } = storeToRefs(useAppStore());
  const { level } = storeToRefs(useAuthStore());

  const schema = object<UpdateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    level: number()
      .max(level.value!, "Você não pode criar um perfil com o nível maior que o seu.")
      .required("Campo Obrigatório"),
  });
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :loading="loading"
    :schema="schema"
    :title="`Alterar Perfil - ${state.name}`"
    api-route="user-profiles"
    name="UserProfiles"
    backRoute="UserProfiles"
  >
    <u-form-group
      label="Nome"
      name="name"
    >
      <u-input
        v-model="state.name"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      label="Nível"
      name="level"
    >
      <u-input
        v-model="state.level"
        :loading="loading"
      />
    </u-form-group>
  </crud-create-and-update>
</template>
