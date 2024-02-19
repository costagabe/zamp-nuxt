<script setup generic="T extends Record<string, any>" lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
import Pagination from "~/ui/components/Pagination.vue";
  type TableProps = {
    columns: TableColumn[];
    data: Array<T>;
  };

  defineProps<TableProps>();

  const [paginationModel] = defineModel<Pagination>("pagination");
</script>

<template>
  <div class="overflow-x-auto">
    <!-- <table class="table">
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
    </table> -->
    <u-table
      :columns="columns"
      :rows="data"
    />
    <u-divider class="mt-2 mb-4"/>
    <div class="justify-center flex">
      <pagination v-model:pagination="paginationModel" />
    </div>
  </div>
</template>
