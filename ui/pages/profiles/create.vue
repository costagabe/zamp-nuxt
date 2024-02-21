<script setup lang="ts">
  import { number, object, string } from "yup";

  type CreateUserForm = {
    name: string;
    level: number;
  };

  definePageMeta({ name: "CreateUserProfile" });

  const defaultState: CreateUserForm = {
    name: "",
    level: 0,
  };

  const state = ref<CreateUserForm>({ ...defaultState });

  const { updates } = storeToRefs(useUserProfileStore());

  const { loading } = storeToRefs(useAppStore());

  const { level } = storeToRefs(useAuthStore());

  const schema = object<CreateUserForm>().shape({
    name: string().trim().required("Campo Obrigatório"),
    level: number()
      .max(level.value!, "Você não pode criar um perfil com o nível maior que o seu.")
      .required("Campo Obrigatório"),
  });

  function handleSubmit() {
    updates.value++;
  }
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :loading="loading"
    :schema="schema"
    :title="`Criar Perfil`"
    @submit="handleSubmit"
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
      :label="`Nível - ${state.level}`"
      name="level"
    >
      <u-range
        v-model="state.level"
        :loading="loading"
        :max="level!"
        :min="1"
      />
    </u-form-group>
  </crud-create-and-update>
</template>
