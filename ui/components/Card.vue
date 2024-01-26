<script setup lang="ts">
  type CardProps = {
    title?: string;
  };

  defineProps<CardProps>();
</script>

<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-title bg-primary h-14 rounded-t pl-4">
      <h2
        v-if="title"
        class="text-primary-content"
      >
        {{ title }}
      </h2>
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
