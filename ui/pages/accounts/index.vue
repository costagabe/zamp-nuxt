<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Accounts" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Código", key: "code" },
    { label: "Tipo", key: "type", class: "text-center" },
    { label: "Balanço (R$)", key: "balance" },
  ];

  const router = useRouter();

  const menus = [
  {
      label: "Lançamentos",
      icon: "i-heroicons-document-chart-bar",
      click: (row: AccountDTO) => router.push({ name: "Entries", params: { id: row.id } }),
      show: (row: AccountDTO) => row.type === "FINANCIAL_ACCOUNT",
    },
    {
      label: "Novo Lançamento",
      icon: "i-heroicons-document-plus",
      click: (row: AccountDTO) => router.push({ name: "CreateEntry", params: { id: row.id } }),
      show: (row: AccountDTO) => row.type === "FINANCIAL_ACCOUNT",
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
    <template #balance-data="{ row }">
      {{ toCurrency(row.balance) }}
    </template>
    <template #type-data="{ row }">
      <accounts-badge :type="row.type" />
    </template>
  </crud-list>
</template>
