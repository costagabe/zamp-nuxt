<script setup lang="ts">
  import type { MenuCategoryEnum } from "~/ui/enum/MenuEnum";

  const { menus } = storeToRefs(useUserStore());

  const categories = computed<Array<MenuCategoryEnum>>(() => Object.keys(menus.value) as Array<MenuCategoryEnum>);
</script>
<template>
  <ul class="menu bg-base-200 w-56 min-h-full">
    <li v-for="category in categories">
      <h2 :class="'menu-title'">{{ category }}</h2>
      <ul v-for="menu in menus[category]">
        <li>
          <NuxtLink
            :href="menu!.path"
            active-class="active"
          >
            <component
              :is="menu!.icon"
              class="h-6 w-6"
            />
            {{ menu?.title }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>
