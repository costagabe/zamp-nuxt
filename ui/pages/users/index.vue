<script setup lang="ts">
  import { useAsyncData } from "#app";
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import type { Page } from "~/ui/types/PaginationTypes";

  definePageMeta({ name: "Users" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Email", key: "email" },
    { label: "Perfil", key: "profile" },
    { label: "Situação", key: "situation", class: "text-center" },
  ];

  const route = useRoute();

  const paginationQuery = computed(() => ({
    page: route.query.page ?? "0",
    size: route.query.size ?? "10",
  }));

  const { data: userPage } = useAsyncData(
    "users",
    () => $fetch<Page<ReadUserDTO>>("/api/users", { query: paginationQuery.value }),
    {
      watch: [paginationQuery],
      default: () =>
        ({
          content: [],
          pagination: undefined,
        }) as Page<ReadUserDTO>,
    }
  );
</script>

<template>
  <crud-list
    :cols="cols"
    name="users"
    title="Usuários"
    update-route="UpdateUser"
    create-route="CreateUser"
  >
    <template #situation-data="{ row }">
      <div class="flex justify-center">
        <u-badge
          :color="row.situation === 'ACTIVE' ? 'emerald' : 'red'"
          :label="row.situation === 'ACTIVE' ? 'Ativo' : 'Inativo'"
          variant="subtle"
        >
          {{ row.situation === "ACTIVE" ? "Ativo" : "Inativo" }}
        </u-badge>
      </div>
    </template>
  </crud-list>
</template>
