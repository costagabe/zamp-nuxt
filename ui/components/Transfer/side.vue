<script setup lang="ts">
  type TransferItem = {
    value: string | number;
    label: string;
  };

  type TransferProps = { items: Array<TransferItem>; title: string };

  const props = defineProps<TransferProps>();
  defineEmits<{ (e: "input", value: TransferItem["value"]): void }>();
</script>

<template>
  <div>
    <h1 class="text-xl text-sambuca-600">{{ title }}</h1>
    <div class="border border-sambuca-700 rounded-md p-2 h-[calc(45dvh)]">
      <ul>
        <li
          v-for="item in items"
          :key="item.value"
          @click="$emit('input', item.value)"
          class="list-item rounded-md py-1 hover:bg-sambuca-700 hover:cursor-pointer"
        >
          <p class="rounded-md p-1">{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
