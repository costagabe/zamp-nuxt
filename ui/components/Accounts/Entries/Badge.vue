<script setup lang="ts">
  defineProps<{
    type: EntryType;
  }>();
</script>

<template>
  <u-badge
    :color="type === 'IN' ? 'emerald' : type === 'TRANSFER' ? 'blue' : 'red'"
    :label="type === 'IN' ? 'Entrada' : type === 'TRANSFER' ? 'Transferência' : 'Saída'"
    class="w-full text-center"
    variant="subtle"
    size="lg"
  >
    <p class="text-center w-full">
      {{ type === "IN" ? "Entrada" : type === "TRANSFER" ? "Transferência" : "Saída" }}
    </p>
    <slot />
  </u-badge>
</template>
