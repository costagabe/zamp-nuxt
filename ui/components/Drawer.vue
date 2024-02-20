<template>
  <div class="flex">
    <div class="pt-2 flex border-r-2 h-screen">
      <u-vertical-navigation :links="menus" />
    </div>
    <div class="flex flex-1 py-16">
      <div class="container flex mx-auto flex-shrink flex-col ">
        <div class="flex flex-col items-center">
          <slot />
        </div>
      
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const { menus } = storeToRefs(useUserStore());
</script>
