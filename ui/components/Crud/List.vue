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
    idRouteName?: string;
    menus?: Array<DropdownItem & { show?(row: T): boolean }>;
  };

  const props = withDefaults(defineProps<CrudListProps>(), { idRouteName: "id" });

  const slots = useSlots();

  const route = useRoute();

  const { loading } = storeToRefs(useAppStore());

  const paginationQuery = computed(() => ({
    page: route.query.page ?? "0",
    size: route.query.size ?? "10",
  }));

  const { data, status, error, refresh } = useAsyncData(
    props.name,
    () => $fetch<Page<T>>(`/server-api/${props.apiListRoute}`, { query: paginationQuery.value }),
    {
      watch: [paginationQuery],
      default: () =>
        ({
          content: [],
          pagination: undefined,
        }) as Page<T>,
    }
  );

  const toast = useToast();

  watch(error, (value) => {
    if (value?.data) {
      const data = value.data as ApiError;

      toast.add({
        title: data.title,
        color: "red",
      });
    }
  });

  watch(
    status,
    (value) => {
      loading.value = value === "pending";
    },
    { immediate: true }
  );

  const hasHeader = computed(() => slots.header !== undefined);
</script>

<template>
  <div class="container mx-auto w-10/12">
    <u-card>
      <template #header>
        <slot name="header" />
        <div
          v-if="!hasHeader"
          class="flex flex-1 align-middle justify-between"
        >
          <p class="text-white align-bottom">{{ title }}</p>
          <u-button :to="{ name: createRoute }">Adicionar</u-button>
        </div>
      </template>

      <template #default>
        <data-table
          v-model:pagination="data.pagination"
          :api-list-route="apiListRoute"
          :id-route-name="idRouteName"
          :data="data.content"
          :columns="cols"
          :menus="menus"
          :update-route="updateRoute"
          @delete="refresh"
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
