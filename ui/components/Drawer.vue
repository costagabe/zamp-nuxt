<template>
    <div class="drawer drawer-open">
        <input
            id="zamp-drawer"
            type="checkbox"
            class="drawer-toggle"
        />
        <div class="drawer-content p-4">
            <slot />
        </div>
        <div class="drawer-side">
            <label
                for="zamp-drawer"
                aria-label="close sidebar"
                class="drawer-overlay"
            ></label>
            <menus />
        </div>
    </div>
</template>
<script setup lang="ts">
    import Menus from "~/ui/components/Menus.vue";
</script>
