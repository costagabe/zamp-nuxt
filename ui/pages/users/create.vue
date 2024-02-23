<script setup lang="ts">
  import { array, object, string } from "yup";

  type CreateUserForm = {
    name: string;
    email: string;
    profileIds: Array<string>;
  };

  definePageMeta({ name: "CreateUser" });

  const defaultState: CreateUserForm = {
    name: "",
    email: "",
    profileIds: [],
  };

  const state = ref<CreateUserForm>({ ...defaultState });

  const { loading } = storeToRefs(useAppStore());

  const { userProfileList } = useUserProfile();

  const schema = object<CreateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
  });
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :loading="loading"
    :schema="schema"
    :title="`Criar Usuário`"
    api-route="users"
    name="Users"
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
