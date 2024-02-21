<script setup lang="ts">
  type EntryFormProps = {
    classificationAccounts: SelectOption[];
  };

  defineProps<EntryFormProps>();

  const [state] = defineModel<EntryDTO>("state", { default: {} as EntryDTO });

  const { loading } = storeToRefs(useAppStore());

  const types = [
    { label: "Entrada", value: "IN" },
    { label: "Saída", value: "OUT" },
    { label: "Transferência", value: "TRANSFER" },
  ];
</script>

<template>
  <div class="flex flex-1 justify-between gap-8">
    <div class="flex">
      <u-form-group
        class="w-40"
        label="Tipo de Lançamento"
        name="type"
      >
        <u-select-menu
          v-model="state.type"
          :loading="loading"
          :options="types"
          class="w-40"
          option-attribute="label"
          value-attribute="value"
          placeholder="Tipo de conta"
          variant="none"
        >
          <template #default>
            <accounts-entries-badge :type="state.type">
              <u-icon name="i-heroicons-chevron-down" />
            </accounts-entries-badge>
          </template>
          <template #option="{ option: type }">
            <accounts-entries-badge :type="type.value" />
          </template>
        </u-select-menu>
      </u-form-group>
    </div>

    <div class="flex flex-1">
      <u-form-group
        class="w-full"
        label="Conta de Classificação"
        name="classificationAccount"
      >
        <u-select-menu
          v-model="state.classificationAccount"
          :loading="loading"
          :options="classificationAccounts"
          :search-attributes="['label']"
          class="w-full"
          option-attribute="label"
          placeholder="Conta de classificação"
          searchable
          value-attribute="value"
        />
      </u-form-group>
    </div>
  </div>
  <u-form-group
    label="Valor (R$)"
    name="value"
  >
    <u-input
      v-model.number="state.value"
      :loading="loading"
    />
  </u-form-group>
  <u-form-group
    label="Descrição"
    name="history"
  >
    <u-input
      v-model="state.history"
      :loading="loading"
    />
  </u-form-group>
</template>
