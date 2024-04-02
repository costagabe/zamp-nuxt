<script setup generic="T extends Record<string, any>" lang="ts">
  import type { DropdownItem } from "#ui/types";

  type TableMenuProps = {
    menus?: Array<DropdownItem & { show?(row: T): boolean }>;
    row: T;
    idRouteName: string;
    updateRoute: string;
    apiListRoute: string;
  };

  const route = useRoute();
  const router = useRouter();

  const props = defineProps<TableMenuProps>();
  const emit = defineEmits(["delete"]);

  const { loading } = storeToRefs(useAppStore());

  const showDeleteModal = ref(false);
  let id = "";

  const items = () => {
    const menus: Array<Array<DropdownItem>> = [
      [
        {
          label: "Editar",
          icon: "i-heroicons-pencil-square-20-solid",
          click: () => {
            router.push({
              name: props.updateRoute,
              params: { ...route.params, [props.idRouteName]: props.row.id },
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
            id = props.row.id;
          },
        },
      ],
    ];

    if (props.menus && props.menus?.find((menu) => menu.show?.(props.row) ?? true)) {
      menus.splice(
        1,
        0,
        props.menus.map((v) => ({ ...v, click: () => v.click!(props.row) }))
      );
    }
    return menus;
  };

  async function onDelete() {
    try {
      loading.value = true;
      await $fetch(`/server-api/${props.apiListRoute}/${id}`, { method: "DELETE" });
    } finally {
      emit("delete");
      loading.value = false;
    }
  }
</script>

<template>
  <confirm-modal
    v-model="showDeleteModal"
    @confirm="onDelete"
  />

  <u-dropdown :items="items()">
    <u-button
      color="gray"
      variant="ghost"
      icon="i-heroicons-ellipsis-horizontal-20-solid"
    />
  </u-dropdown>
</template>
