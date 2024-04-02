<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "Entries" });
  useHead({ title: "Entradas" });

  const cols: Array<TableColumn> = [
    { label: "Data", key: "date" , class: "w-40"},
    { label: "Conta", key: "classificationAccountName", class: "w-40"},
    { label: "Valor (R$)", key: "value", class: "w-28 text-center" },
    { label: "Descrição", key: "history" },
  ];

  const route = useRoute();

  function getCurrencyClass(type: string) {
    return `text-right w-full ${type === "IN" ? "text-green-500" : "text-red-500"}`;
  }
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
    <template #header>
      <div class="flex flex-1 align-middle justify-between">
        <div class="flex">
          <u-button
            :to="{ name: 'Accounts' }"
            variant="ghost"
          >
            <u-icon
              name="i-heroicons-arrow-left-20-solid"
              class="text-xl"
            />
          </u-button>
          <p class="text-white align-bottom ml-8 mt-1">Lançamentos</p>
        </div>
        <u-button :to="{ name: 'CreateEntry' }">Adicionar</u-button>
      </div>
    </template>
    <template #value-data="{ row }">
      <div :class="getCurrencyClass(row.type)">
        <u-badge
          :color="row.type === 'IN' ? 'emerald' : row.type === 'TRANSFER' ? 'blue' : 'red'"
          class="w-24 text-center justify-center"
          variant="subtle"
          size="lg"
        >
        {{ toCurrency(row.value) }}
        </u-badge>
      </div>
    </template>
    <template #type-data="{ row }">
      <accounts-entries-badge :type="row.type" />
    </template>
  </crud-list>
</template>
