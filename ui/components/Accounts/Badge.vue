<script setup lang="ts">
  defineProps<{
    type: AccountType;
  }>();
</script>
<template>
  <u-badge
    :color="type === 'INCOME_ACCOUNT' ? 'emerald' : type === 'EXPENSE_ACCOUNT' ? 'red' : 'blue'"
    :label="type === 'INCOME_ACCOUNT' ? 'Receita' : type === 'EXPENSE_ACCOUNT' ? 'Despesa' : 'Financeira'"
    class="w-full text-center"
    variant="subtle"
    size="lg"
  >
    <p class="text-center w-full">
      {{ type === "INCOME_ACCOUNT" ? "Receita" : type === "EXPENSE_ACCOUNT" ? "Despesa" : "Financeira" }}
    </p>
    <slot />
  </u-badge>
</template>
