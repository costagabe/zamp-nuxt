<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Users" });
  useHead({ title: "Usuários" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Email", key: "email" },
    { label: "Perfil", key: "profile" },
    { label: "Situação", key: "situation", class: "text-center w-24" },
  ];
</script>

<template>
  <crud-list
    :cols="cols"
    name="users"
    title="Usuários"
    api-list-route="users"
    update-route="UpdateUser"
    create-route="CreateUser"
  >
    <template #situation-data="{ row }">
      <div class="flex justify-center">
        <u-badge
          :color="row.situation === 'ACTIVE' ? 'emerald' : 'red'"
          :label="row.situation === 'ACTIVE' ? 'Ativo' : 'Inativo'"
          class="w-full justify-center"
          variant="subtle"
        >
          {{ row.situation === "ACTIVE" ? "Ativo" : "Inativo" }}
        </u-badge>
      </div>
    </template>
  </crud-list>
</template>
