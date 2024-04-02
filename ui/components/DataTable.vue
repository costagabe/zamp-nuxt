<script setup generic="T extends Record<string, any>" lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import type { DropdownItem } from "#ui/types";

  import Pagination from "~/ui/components/Pagination.vue";
  type TableProps = {
    columns: TableColumn[];
    data: Array<T>;
    idRouteName: string;
    updateRoute: string;
    apiListRoute: string;
    menus?: Array<DropdownItem & { show?(row: T): boolean }>;
  };

  const props = defineProps<TableProps>();
  const emit = defineEmits(["delete"]);

  const { loading } = storeToRefs(useAppStore());

  const cols = computed(() => [...props.columns, { label: "Ações", key: "id", class: "w-[80px]" }]);

  const [paginationModel] = defineModel<Pagination>("pagination");
</script>

<template>
  <div class="overflow-x-auto">
    <u-table
      :columns="cols"
      :rows="data"
      :loading="loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Carregando...' }"
    >
      <template #id-data="{ row }">
        <slot
          name="data-table-menu"
          :id-route-name
          :update-route
          :api-list-route
          :row
        />

        <data-table-menu
          v-if="!$slots['data-table-menu']"
          :id-route-name
          :update-route
          :api-list-route
          :row
          @delete="() => emit('delete')"
        />
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

<style>
  thead > tr:hover {
    background-color: rfb(var(--color-primary-800)) !important;
  }
</style>
