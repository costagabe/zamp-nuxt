<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "clients" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Email", key: "email" },
  ];

  const router = useRouter();
    const menus = [
  {
      label: "Documentos",
      icon: "i-heroicons-document",
      click: (row: AccountDTO) => router.push({ name: "ClientDocuments", params: { id: row.id } }),
    },
    {
      label: "Novo Documento",
      icon: "i-heroicons-document-plus",
      click: (row: AccountDTO) => router.push({ name: "CreateClientDocument", params: { id: row.id } }),
    },
  ];
</script>

<template>
  <crud-list
    :cols="cols"
    :menus="menus"
    name=""
    title="Clientes"
    api-list-route="clients"
    update-route="UpdateClient"
    create-route="CreateClient"
  >

  </crud-list>
</template>
