<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "ClientDocuments" });
  useHead({ title: "Documentos do Cliente" });

  const route = useRoute();
  const {loading} = storeToRefs(useAppStore())

  const cols: Array<TableColumn> = [{ label: "Nome", key: "name" }];

    async function handleDelete() {
      try {
        loading.value = true;
      await $fetch(`/api/files`, { method: "DELETE", body: {fileName: ""} });
    } finally {
      loading.value = false;
    }
    }

</script>

<template>
  <crud-list
    :cols="cols"
    :api-list-route="`clients/${route.params.id}/documents`"
    @delete="handleDelete"
    id-route-name="documentId"
    name="clientDocuments"
    title="Documentos do Cliente"
    update-route="UpdateClientDocument"
    create-route="CreateClientDocument"
  >
  </crud-list>
</template>
