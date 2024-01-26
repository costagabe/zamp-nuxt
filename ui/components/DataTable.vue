<script setup generic="T extends Record<string, any>" lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import Pagination from "~/ui/components/Pagination.vue";

  type TableProps = {
    columns: Array<TableColumn<T>>;
    data: Array<T>;
    pagination?: Pagination;
  };

  const props = defineProps<TableProps>();

  const paginationModel = useModel(props, "pagination");
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :class="column.class"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in data"
          class="hover"
        >
          <td
            v-for="(col, i) in columns"
            :key="`${String(col.key)}-item-${i}`"
          >
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="divider" />
    <div class="justify-center flex">
      <pagination v-model:pagination="paginationModel" />
    </div>
  </div>
</template>
