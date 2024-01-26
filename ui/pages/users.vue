<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import DataTable from "~/ui/components/DataTable.vue";
  import type { Page } from "~/ui/types/PaginationTypes";
  import type { ReadUserDTO } from "~/ui/types/User";
  import { useAsyncData } from "#app";

  const cols: Array<TableColumn<ReadUserDTO>> = [
    { title: "Nome", key: "name" },
    { title: "Sobrenome", key: "email" },
    { title: "Situação", key: "situation" },
  ];

  const userPage = ref<Page<ReadUserDTO>>({ content: [] });

  const route = useRoute();

  const paginationQuery = computed(() => ({
    page: route.query.page ?? 0,
    size: route.query.size ?? 10,
  }));

  const { data, error } = useAsyncData("users", () => $fetch<Page<ReadUserDTO>>("/api/users", { query: paginationQuery.value }), {
    watch: [paginationQuery],
  });

  watch(data, (value) => {
    if (value) {
      Object.assign(userPage.value, value);
    }
  });
  // const { data, error } = await useAsyncData(
  //   "users",
  //   () => $fetch<Page<ReadUserDTO>>("http://localhost:8080/users", { query: paginationQuery.value }),
  //   {
  //     watch: [paginationQuery],
  //   }
  // );
  // watch(paginationQuery, (v) => {
  //   console.log(v);
  //   refresh();
  // });
</script>

<template>
  <div class="container mx-auto w-10/12">
    <card title="Usuários">
      <data-table
        :data="userPage.content ?? []"
        :columns="cols"
        v-model:pagination="userPage.pagination"
      />
    </card>
  </div>
</template>
