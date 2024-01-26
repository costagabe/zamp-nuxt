<script setup lang="ts">
    import type { MenuEnum } from "../enum/MenuEnum";
    import { generateMenuStructure } from "../util/MenuBuilder";

    const menus = ref<Array<string>>([]);
    const { data, error } = await useApiFetch<Array<MenuEnum>>("/users/menus");

    watch(
        data,
        (value) => {
            if (value) {
                const menus = generateMenuStructure(value);
                console.log(menus);
            }
        },
        { immediate: true }
    );
</script>

<template>
    <div>
        <drawer>
            <slot />
        </drawer>
    </div>
</template>
