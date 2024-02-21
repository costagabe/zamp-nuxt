<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import DataTable from "~/ui/components/DataTable.vue";
  import type { Page } from "~/ui/types/PaginationTypes";
  import { useAsyncData } from "#app";

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
  <div class="container mx-auto w-10/12">
    <u-card>
      <template #header>
        <div class="flex flex-1 align-middle justify-between">
          <p class="text-white align-bottom">Usuários</p>
          <u-button :to="{ name: 'CreateUser' }">Adicionar</u-button>
        </div>
      </template>

      <template #default>
        <data-table
          v-model:pagination="userPage.pagination"
          :data="userPage.content"
          :columns="cols"
          update-route="UpdateUser"
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
        </data-table>
      </template>
    </u-card>
  </div>
</template>
