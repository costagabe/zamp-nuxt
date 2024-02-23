<script setup lang="ts">
  import type { TableColumn } from "~/ui/types/DataTableTypes";

  definePageMeta({ name: "clients" });

  const cols: Array<TableColumn> = [
    { label: "Nome", key: "name" },
    { label: "Email", key: "email" },

  ];
</script>

<template>
  <crud-list
    :cols="cols"
    name=""
    title="Clientes"
    api-list-route="clients"
    update-route="UpdateClient"
    create-route="CreateClient"
  >

  </crud-list>
</template>
