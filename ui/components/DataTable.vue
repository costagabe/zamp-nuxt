<script setup generic="T extends Record<string, any>" lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import Pagination from "~/ui/components/Pagination.vue";
  type TableProps = {
    columns: TableColumn[];
    data: Array<T>;
  };

  const props = defineProps<TableProps>();

  const cols = computed(() => [...props.columns, { label: "Ações", key: "id", class: "w-[80px]" }]);

  const [paginationModel] = defineModel<Pagination>("pagination");

  const items = (row: { id: string }) => [
    [
      {
        label: "Editar",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => console.log("Edit", row.id),
      },
      {
        label: "Duplicar",
        icon: "i-heroicons-document-duplicate-20-solid",
      },
    ],
    [
      {
        label: "Apagar",
        icon: "i-heroicons-trash-20-solid",
      },
    ],
  ];
</script>

<template>
  <div class="overflow-x-auto">
    <u-table
      :columns="cols"
      :rows="data"
    >
      <template #id-data="{ row }">
        <u-dropdown :items="items(row)">
          <u-button
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </u-dropdown>
      </template>

      <template
        v-for="(_, name) in $slots"
        v-slot:[name]="slotData"
      >
        <slot
          :name="name"
          v-bind="slotData"
        />
      </template>
    </u-table>
    <u-divider class="mt-2 mb-4" />
    <div class="justify-center flex">
      <pagination v-model:pagination="paginationModel" />
    </div>
  </div>
</template>
