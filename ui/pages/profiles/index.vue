<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "UserProfiles" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Nível", key: "level" },
  ];
</script>

<template>
  <crud-list
    :cols="cols"
    name="user-profiles"
    title="Perfis de Usuário"
    api-list-route="user-profiles"
    update-route="UpdateUserProfile"
    create-route="CreateUserProfile"
  />
</template>
