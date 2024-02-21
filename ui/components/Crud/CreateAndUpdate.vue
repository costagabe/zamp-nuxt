<script setup lang="ts" generic="T extends object">
  import type { ObjectSchema } from "yup";
  import type { FormSubmitEvent } from "#ui/types";

  type CreateAndUpdateProps = {
    title: string;
    backRoute: string;
    schema: ObjectSchema<any>;
    loading: boolean;
  };

  const [state] = defineModel<T>("state", { default: {} as T });

  defineProps<CreateAndUpdateProps>();

  defineEmits<{ (e: "submit", event: FormSubmitEvent<any>): void }>();
</script>

<template>
  <u-card class="w-10/12">
    <template #header>
      <div class="flex flex-1 align-middle justify-between">
        <p class="text-white align-bottom">{{ title }}</p>
        <u-button :to="{ name: backRoute }">Voltar</u-button>
      </div>
    </template>

    <template #default>
      <u-form
        :schema="schema"
        :state="state"
        :validate-on="['submit']"
        @submit="$emit('submit', $event)"
        class="space-y-4"
        ref="form"
      >
        <slot />
        <u-button
          block
          class="mt-4"
          type="submit"
          :loading="loading"
        >
          Enviar
        </u-button>
      </u-form>
    </template>
  </u-card>
</template>
