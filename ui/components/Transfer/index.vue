<script setup lang="ts">
  type TransferItem = {
    value: string | number;
    label: string;
  };

  type TransferProps = { items: Array<TransferItem>; maxItems?: number };

  const props = withDefaults(defineProps<TransferProps>(), { maxItems: 10 });

  const modelValue = defineModel<Array<TransferItem["value"]>>({ default: [] });
  const search = ref("");

  const filteredItems = computed(() =>
    props.items
      .filter((v) => v.label.toLowerCase().includes(search.value.toLowerCase()))
      .filter((v) => !modelValue.value.includes(v.value))
      .splice(0, props.maxItems)
  );

  const selectedItems = computed<Array<TransferItem>>(() => modelValue.value
  .map((v) => props.items.find((t) => t.value === v))
  .filter((v) => v?.label.toLowerCase().includes(search.value.toLowerCase()))
  .slice(0, props.maxItems)
  .reverse() as Array<TransferItem> ?? []);

  function deleteItem(value: TransferItem["value"]) {
    modelValue.value.splice(modelValue.value.indexOf(value), 1);
  }

  function addItem(value: TransferItem["value"]) {
    if (modelValue.value.includes(value)) return;
    modelValue.value.push(value);
  }
</script>

<template>
  <div class="border p-4 border-sambuca-700 rounded-md">
    <div class="mb-4">
      <u-input
        v-model="search"
        placeholder="Pesquisar"
      />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <transfer-side
        :items="filteredItems"
        @input="addItem"
        title="Disponíveis"
      />
      <transfer-side
        :items="selectedItems"
        @input="deleteItem"
        title="Selecionados"
      />
    </div>
  </div>
</template>
