<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import DataTable from "~/ui/components/DataTable.vue";
  import type { Page } from "~/ui/types/PaginationTypes";
  import { useAsyncData } from "#app";

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Sobrenome", key: "email" },
    { label: "Situação", key: "situation" },
  ];

  const route = useRoute();

  const paginationQuery = computed(() => ({
    page: route.query.page ?? 0,
    size: route.query.size ?? 10,
  }));

  const { data: userPage } = useAsyncData("users", () => $fetch<Page<ReadUserDTO>>("/api/users", { query: paginationQuery.value }), {
    watch: [paginationQuery],
    default: () =>
      ({
        content: [],
        pagination: undefined,
      }) as Page<ReadUserDTO>,
  });
</script>

<template>
  <div class="container mx-auto w-10/12">
    <u-card>
      <template #header>
        <div class="flex flex-1 align-middle justify-between">
          <p class="text-contrast align-bottom">Usuários</p>
          <u-button>Adicionar</u-button>
        </div>
      </template>

      <template #default>
        <data-table
          :data="userPage.content"
          :columns="cols"
          v-model:pagination="userPage.pagination"
        />
      </template>
    </u-card>
  </div>
</template>
