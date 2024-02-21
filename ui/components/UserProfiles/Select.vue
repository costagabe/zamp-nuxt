import type { mergeProps } from 'vue';
<script setup lang="ts">
  defineProps<{
    loading: boolean;
  }>();

  const [profiles] = defineModel<Array<string>>("profiles", { default: [] });
  const [userProfileList] = defineModel<SelectOption[]>("userProfileList", { default: [] as SelectOption[] });

  const selectedProfilesLabel = computed(() =>
    profiles.value.map((id) => userProfileList.value.find((p) => p.value === id)?.label).join(", ")
  );

</script>

<template>
  <u-select-menu
    v-model="profiles"
    :loading="loading"
    :options="userProfileList"
    searchable
    multiple
    option-attribute="label"
    value-attribute="value"
    placeholder="Perfis de Usuário"
    searchable-placeholder="Procurar perfil"
  >
    <template #label>
      <span
        v-if="profiles.length"
        class="truncate"
      >
        {{ selectedProfilesLabel }}
      </span>
      <span v-else>Selecionar Perfis</span>
    </template>
  </u-select-menu>
</template>
