import type { mergeProps } from 'vue';
<script setup lang="ts">
  const props = defineProps<{
    loading: boolean;
    userProfileList: SelectOption[];
  }>();

  const [profiles] = defineModel<Array<string>>("profiles", { default: [] });

  const selectedProfiles = computed(() =>
    profiles.value.map((id) => props.userProfileList.find((p) => p.value === id)!.label)
  );
</script>

<template>
  <u-select-menu
    v-model="profiles"
    :loading="loading"
    :options="userProfileList"
    :search-attributes="['label']"
    multiple
    option-attribute="label"
    value-attribute="value"
    placeholder="Perfis de Usuário"
    searchable
    searchable-placeholder="Procurar perfil"
  >
    <template #label>
      <span
        v-if="profiles.length"
        class="truncate"
        >{{ selectedProfiles.join(", ") }}</span
      >
      <span v-else>Selecionar Perfis</span>
    </template>
  </u-select-menu>
</template>
