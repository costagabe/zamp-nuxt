<template>
  <div class="flex">
    <div class="mt-2 flex">
      <u-vertical-navigation :links="menus" />
    </div>
    <div class="flex flex-1 py-16">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { MenuCategoryEnum } from "~/ui/enum/MenuEnum";

  const { menus } = storeToRefs(useUserStore());

  const categories = computed<Array<MenuCategoryEnum>>(() => Object.keys(menus.value) as Array<MenuCategoryEnum>);
</script>
