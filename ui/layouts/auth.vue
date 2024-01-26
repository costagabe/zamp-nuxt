<script setup lang="ts">
    const layoutStore = useLayoutStore();
</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <div class="w-5/12 card shadow-xl">
            <div class="card-title bg-gray-500 h-14 rounded-t-lg pl-4">
                <h1 class="text-white">{{ layoutStore.title }}</h1>
            </div>
            <div class="card-body bg-accent-content/10">
                <slot />
            </div>
        </div>
    </div>
</template>
