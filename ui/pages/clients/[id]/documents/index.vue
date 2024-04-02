<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";
  import type { DropdownItem } from "#ui/types";

  definePageMeta({ name: "ClientDocuments" });
  useHead({ title: "Documentos do Cliente" });

  const route = useRoute();
  const router = useRouter();

  const { loading } = storeToRefs(useAppStore());

  const cols: Array<TableColumn> = [{ label: "Nome", key: "name" }];

  async function handleDelete(fileName: string) {
    try {
      loading.value = true;
      await $fetch(`/api/files`, { method: "DELETE", body: { fileName } });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <crud-list
    :cols="cols"
    :api-list-route="`clients/${route.params.id}/documents`"
    id-route-name="documentId"
    name="clientDocuments"
    title="Documentos do Cliente"
    update-route="UpdateClientDocument"
    create-route="CreateClientDocument"
  >
    <template #data-table-menu="{ idRouteName, updateRoute, apiListRoute, row }">
      <data-table-menu
        :id-route-name
        :update-route
        :api-list-route
        :row
        @delete="() => handleDelete(row.publicPath)"
      />
    </template>
  </crud-list>
</template>
