<script setup lang="ts">
  const layoutStore = useLayoutStore();
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <u-card class="w-5/12">
        <template #header>
            <h1 class="text-white">{{ layoutStore.title }}</h1>
        </template>
      <slot />
    </u-card>
  </div>
</template>
