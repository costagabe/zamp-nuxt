<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Entries" });

  const cols: Array<TableColumn> = [
    { label: "Tipo da transação", key: "type", class: "w-40" },
    { label: "Conta", key: "classificationAccountName" },
    { label: "Valor (R$)", key: "value" },
    { label: "Descrição", key: "history" },
    { label: "Data", key: "date" },
  ];

  const route = useRoute();
</script>

<template>
  <crud-list
    :cols="cols"
    :api-list-route="`accounts/${route.params.id}/entries`"
    create-route="CreateEntry"
    name="entries"
    title="Lançamentos"
    id-route-name="entryId"
    update-route="UpdateEntry"
  >
    <template #value-data="{ row }">
      {{ toCurrency(row.value) }}
    </template>
    <template #type-data="{ row }">
      <accounts-entries-badge :type="row.type" />
    </template>
  </crud-list>
</template>
