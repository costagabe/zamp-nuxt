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

  const route = useRoute();
  const router = useRouter();
  const props = defineProps<TableProps>();
  const emits = defineEmits(["delete"]);
  const showDeleteModal = ref(false);
  let id = "";

  const { loading } = storeToRefs(useAppStore());

  const cols = computed(() => [...props.columns, { label: "Ações", key: "id", class: "w-[80px]" }]);

  const [paginationModel] = defineModel<Pagination>("pagination");

  const items = (row: T) => {
    const menus: Array<Array<DropdownItem>> = [
      [
        {
          label: "Editar",
          icon: "i-heroicons-pencil-square-20-solid",
          click: () => {
            router.push({
              name: props.updateRoute,
              params: { ...route.params, [props.idRouteName]: row.id },
            });
          },
        },
      ],
      [
        {
          label: "Apagar",
          icon: "i-heroicons-trash-20-solid",
          click: async () => {
            showDeleteModal.value = true;
            id = row.id;
          },
        },
      ],
    ];

    if (props.menus && props.menus?.find((menu) => menu.show?.(row) ?? true)) {
      menus.splice(
        1,
        0,
        props.menus.map((v) => ({ ...v, click: () => v.click!(row) }))
      );
    }
    return menus;
  };

  async function onDelete() {
    try {
      loading.value = true;
      await $fetch(`/server-api/${props.apiListRoute}/${id}`, { method: "DELETE" });
    } finally {
      emits("delete");
      loading.value = false;
    }
  }
</script>

<template>
  <confirm-modal
    v-model="showDeleteModal"
    @confirm="onDelete"
  />
  <div class="overflow-x-auto">
    <u-table
      :columns="cols"
      :rows="data"
      :loading="loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Carregando...' }"
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

<style>
  thead > tr:hover {
    background-color: rfb(var(--color-primary-800)) !important;
  }
</style>
