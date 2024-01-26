<script setup lang="ts">
    type TextInputProps = {
        label?: string;
        errorMessage?: string;
        value?: string | null;
    };

    const props = defineProps<TextInputProps>();

    const model = useModel(props, "value");

    const error = computed(() => !!props.errorMessage);

    const inputClass = computed(() => [
        "input",
        "input-bordered",
        "w-full",
        {
            "input-bordered": error.value,
            "input-error": error.value,
        },
    ]);

    const labelClass = computed(() => ["label-text", "text-lg", { "text-error": error.value }]);
</script>

<template>
    <div class="form-control w-full">
        <div class="label">
            <span :class="labelClass">{{ label }}</span>
        </div>
        <input
            v-bind="$attrs"
            v-model="model"
            :class="inputClass"
        />
        <div
            class="label"
            v-if="error"
        >
            <span class="label-text-alt text-error text-[16px]">{{ errorMessage }}</span>
        </div>
    </div>
</template>
