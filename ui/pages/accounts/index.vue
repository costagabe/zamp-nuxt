<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Accounts" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Código", key: "code" },
    { label: "Tipo", key: "type" },
    { label: "Balanço", key: "balance" },
  ];

  const router = useRouter();

  const menus = [
    {
      label: "Lançamentos",
      icon: "i-heroicons-document-chart-bar",
      click: (row: AccountDTO) => router.push({ name: "Entries", params: { id: row.id } }),
    },
  ];
</script>

<template>
  <crud-list
    :cols="cols"
    :menus="menus"
    name="accounts"
    title="Contas"
    api-list-route="accounts"
    update-route="UpdateAccount"
    create-route="CreateAccount"
  >
    <template #type-data="{ row }">
      <accounts-badge :type="row.type" />
    </template>
  </crud-list>
</template>
