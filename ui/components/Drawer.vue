<template>
  <div class="flex">
    <div class="pt-2 flex border-r-2 h-screen">
      <u-vertical-navigation :links="menus" />
    </div>
    <div class="flex flex-1 py-16 justify-center">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
  const { menus } = storeToRefs(useUserStore());
</script>
