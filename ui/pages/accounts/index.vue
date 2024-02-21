<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Accounts" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Código", key: "code" },
    { label: "Tipo", key: "type" },
    { label: "Balanço", key: "balance" },
  ];
</script>

<template>
  <crud-list
    :cols="cols"
    name="accounts"
    title="Contas"
    update-route="UpdateAccount"
    create-route="CreateAccount"
  >
    <template #type-data="{ row }">
      <u-badge
        :color="row.type === 'INCOME_ACCOUNT' ? 'emerald' : row.type === 'EXPENSE_ACCOUNT' ? 'red' : 'blue'"
        :label="
          row.type === 'INCOME_ACCOUNT'
            ? 'Receita'
            : row.type === 'EXPENSE_ACCOUNT'
              ? 'Despesa'
              : 'Financeira'
        "
        variant="subtle"
      >
        {{
          row.type === "INCOME_ACCOUNT"
            ? "Receita"
            : row.type === "EXPENSE_ACCOUNT"
              ? "Despesa"
              : "Financeira"
        }}
      </u-badge>
    </template>
  </crud-list>
</template>
