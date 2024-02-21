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
  <div class="flex flex-1 justify-between gap-8">
    <div class="flex flex-1">
      <u-form-group
      class="w-full"
        label="Código"
        name="code"
      >
        <u-input
          v-model="state.code"
          :loading="loading"
        />
      </u-form-group>
    </div>
    <div class="w-32 flex ">
      <u-form-group
      class="flex flex-col justify-between"
        label="Tipo"
        name="type"
      >
        <u-select-menu
          v-model="state.type"
          :loading="loading"
          :options="types"
          class="w-32"
          option-attribute="label"
          value-attribute="value"
          placeholder="Tipo de conta"
          variant="none"
        >
          <template #default>
            <accounts-badge :type="state.type">
              <u-icon name="i-heroicons-chevron-down" />
            </accounts-badge>
          </template>
          <template #option="{ option: type }">
            <accounts-badge :type="type.value" />
          </template>
        </u-select-menu>
      </u-form-group>
    </div>
  </div>
</template>
