<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Entries" });

  const cols: Array<TableColumn> = [
    { label: "Tipo da transação", key: "type" },
    { label: "Valor", key: "value" },
    { label: "Data", key: "date" },
    { label: "Descrição", key: "history" },
  ];

  const route = useRoute();
</script>

<template>
  <crud-list
    :cols="cols"
    name="entries"
    title="Lançamentos"
    :api-list-route="`accounts/${route.params.id}/entries`"
    update-route="UpdateEntry"
    create-route="CreateEntry"
  >
    <template #type-data="{ row }">
      <u-badge
        :color="row.type === 'IN' ? 'emerald' : 'red'"
        :label="row.type === 'IN' ? 'Entrada' : 'Saída'"
        variant="subtle"
      >
        {{ row.type === "IN" ? "Entrada" : "Saída" }}
      </u-badge>
    </template>
  </crud-list>
</template>
