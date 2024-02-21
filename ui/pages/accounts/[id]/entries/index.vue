<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Entries" });

  const cols: Array<TableColumn> = [
    { label: "Tipo da transação", key: "type", class: "w-40" },
    { label: "Valor", key: "value" },
    { label: "Data", key: "date" },
    { label: "Descrição", key: "history" },
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
    <template #type-data="{ row }">
      <accounts-entries-badge :type="row.type" />
    </template>
  </crud-list>
</template>
