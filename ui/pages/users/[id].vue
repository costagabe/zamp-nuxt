<script setup lang="ts">
  import { array, object, string } from "yup";

  type UpdateUserForm = {
    id: string;
    name: string;
    email: string;
    profileIds: Array<string>;
    situation: "ACTIVE" | "INACTIVE";
  };

  definePageMeta({ name: "UpdateUser" });

  const defaultState: UpdateUserForm = {
    id: "",
    name: "",
    email: "",
    profileIds: [],
    situation: "INACTIVE",
  };
  const state = ref<UpdateUserForm>({ ...defaultState });

  const situation = computed({
    get() {
      return state.value.situation === "ACTIVE";
    },
    set(value: boolean) {
      state.value.situation = value ? "ACTIVE" : "INACTIVE";
    },
  });

  const situationLabel = computed(() => (situation.value ? "Situação: Ativo" : "Situação: Inativo"));

  const { loading } = storeToRefs(useAppStore());

  const { userProfileList } = useUserProfile();

  const schema = object<UpdateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
    situation: string().oneOf(["ACTIVE", "INACTIVE"], "Situação inválida").required("Campo Obrigatório"),
  });
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :schema="schema"
    :title="`Atualiar Usuário - ${state.name}`"
    api-route="users"
    backRoute="Users"
    name="Users"
  >
    <div class="flex flex-1 justify-between gap-8">
      <div class="flex flex-1">
        <u-form-group
          class="w-full"
          label="Nome Completo"
          name="name"
        >
          <u-input
            v-model="state.name"
            :loading="loading"
          />
        </u-form-group>
      </div>
      <div class="w-32 flex">
        <u-form-group
          :label="situationLabel"
          class="flex flex-col justify-between"
          name="situation"
        >
          <u-toggle
            v-model="situation"
            :loading="loading"
          />
        </u-form-group>
      </div>
    </div>

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
