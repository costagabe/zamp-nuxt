<script setup lang="ts">
  import type { AccountDTO } from "~/ui/types/Account";

  defineProps<{
    loading: boolean;
  }>();

  const [state] = defineModel<AccountDTO>("state", { default: {} });

  const types = [
    { label: "Conta de Receita", value: "INCOME_ACCOUNT" },
    { label: "Conta de Despesa", value: "EXPENSE_ACCOUNT" },
    { label: "Conta Financeira", value: "FINANCIAL_ACCOUNT" },
  ];
</script>

<template>
  <u-form-group
    label="Nome"
    name="name"
  >
    <u-input
      v-model="state.name"
      :loading="loading"
    />
  </u-form-group>

  <u-form-group
    label="Código"
    name="code"
  >
    <u-input
      v-model="state.code"
      :loading="loading"
    />
  </u-form-group>

  <u-form-group
    label="Tipo"
    name="type"
  >
    <u-select-menu
      v-model="state.type"
      :loading="loading"
      :options="types"
      option-attribute="label"
      value-attribute="value"
      placeholder="Tipo de conta"
    />
  </u-form-group>
</template>
