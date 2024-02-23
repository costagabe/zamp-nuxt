<template>
  <div class="flex bg-harvest-gold-400">
    <template v-if="menus.length">
      <div class="pt-2 flex border-r-2 h-screen">
        <div class="flex flex-col justify-between">
          <u-vertical-navigation :links="menus" />
          <div class="flex justify-center">
            <u-button
              @click="logout"
              class="w-full justify-center mb-4"
            >
              Sair
            </u-button>
          </div>
        </div>
      </div>
      <div class="flex flex-1 py-16 justify-center">
        <div class="container flex flex-shrink flex-col">
          <div class="flex flex-col items-center">
            <slot />
            
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
  const { menus } = storeToRefs(useUserStore());

  const { logout } = useAuthStore();
</script>
