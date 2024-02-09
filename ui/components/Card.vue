<script setup lang="ts">
  type CardProps = {
    title?: string;
  };

  defineProps<CardProps>();
</script>

<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-title bg-primary h-14 rounded-t px-4 py-4">
      <div
        class="flex flex-1 align-middle justify-between"
        v-if="title"
      >
        <p class="text-contrast align-bottom">
          {{ title }}
        </p>
        <div>
          <Button>Adicionar</Button>
        </div>
      </div>
      <slot
        v-else
        name="title"
      />
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>
