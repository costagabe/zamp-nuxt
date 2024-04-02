<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "ClientDocuments" });
  useHead({ title: "Documentos do Cliente" });

  const route = useRoute();

  const cols: Array<TableColumn> = [{ label: "Nome", key: "name" }];
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
  </crud-list>
</template>
