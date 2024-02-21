<script setup lang="ts" generic="T extends object">
  import { useAsyncData } from "#app";
  import DataTable from "~/ui/components/DataTable.vue";
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import type { Page } from "~/ui/types/PaginationTypes";
  import type { DropdownItem } from "#ui/types";

  type CrudListProps = {
    cols: Array<TableColumn>;
    name: string;
    title: string;
    apiListRoute: string;
    updateRoute: string;
    createRoute: string;
    menus?: Array<DropdownItem>;
  };

  const props = defineProps<CrudListProps>();

  const route = useRoute();

  const { loading } = storeToRefs(useAppStore());

  const paginationQuery = computed(() => ({
    page: route.query.page ?? "0",
    size: route.query.size ?? "10",
  }));

  const { data, status } = useAsyncData(
    props.name,
    () => $fetch<Page<T>>(`/api/${props.apiListRoute}`, { query: paginationQuery.value }),
    {
      watch: [paginationQuery],
      default: () =>
        ({
          content: [],
          pagination: undefined,
        }) as Page<T>,
    }
  );

  watch(status, (value) => {
    loading.value = value === "pending";
  });
</script>

<template>
  <div class="container mx-auto w-10/12">
    <u-card>
      <template #header>
        <div class="flex flex-1 align-middle justify-between">
          <p class="text-white align-bottom">{{ title }}</p>
          <u-button :to="{ name: createRoute }">Adicionar</u-button>
        </div>
      </template>

      <template #default>
        <data-table
          v-model:pagination="data.pagination"
          :data="data.content"
          :columns="cols"
          :loading="loading"
          :menus="menus"
          :update-route="updateRoute"
        >
          <template
            v-for="(_, name) in $slots"
            v-slot:[name]="slotData"
          >
            <slot
              :name="name"
              v-bind="slotData"
            />
          </template>
        </data-table>
      </template>
    </u-card>
  </div>
</template>
