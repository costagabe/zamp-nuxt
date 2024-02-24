<script setup lang="ts">
  import { number, object, string } from "yup";
  import { useUserProfile } from "~/ui/composables/useUserProfile";

  type UpdateUserForm = {
    id: string;
    name: string;
    level: number;
    permissions: Array<string>;
  };

  definePageMeta({ name: "UpdateUserProfile" });

  const defaultState: UpdateUserForm = {
    id: "",
    name: "",
    level: 0,
    permissions: [],
  };

  const state = ref<UpdateUserForm>({ ...defaultState });

  const { userProfilePermissions } = useUserProfile();

  function getGroupName(permission: PermissionDTO) {
    return permission.name.substring(permission.name.lastIndexOf("_") + 1);
  }

  function getGroup(permission: PermissionDTO) {
    return { title: "", key: getGroupName(permission) };
  }

  const groups = computed(() =>
    userProfilePermissions.value?.map(getGroup).filter((v, i, a) => a.findIndex((t) => t.key === v.key) === i)
  );

  const items = computed(() =>
    userProfilePermissions.value.map((permission) => ({
      value: permission.name,
      label: permission.description,
    }))
  );

  const { loading } = storeToRefs(useAppStore());
  const { level } = storeToRefs(useAuthStore());

  const schema = object<UpdateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    level: number()
      .required("Campo Obrigatório"),
  });

  const permissions = ref([]);
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
    <u-form-group
      label="Permissões"
      name="permissions"
    >
      <transfer
        v-model="state.permissions"
        :groups="groups"
        :items="items"
      />
    </u-form-group>
  </crud-create-and-update>
</template>
