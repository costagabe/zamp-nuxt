<script setup lang="ts">
  const [state] = defineModel<AddressDTO>("state", { default: {} });

  const { loading } = storeToRefs(useAppStore());
</script>

<template>
  <h2>Endereço</h2>
  <div
    class="grid xs:grid-cols-1 sm:grid-cols-1 gap-y-4 md:grid-cols-8 md:gap-x-4 lg:grid-cols-12 xl:gap-x-8"
  >
    <u-form-group
      class="sm:col-span-1 md:col-span-2 lg:col-span-2"
      label="CEP"
      name="address.cep"
    >
      <u-input
        v-model="state.cep"
        :loading="loading"
      />
    </u-form-group>
    <u-form-group
      class="md:col-span-6 lg:col-span-8"
      label="Rua"
      name="address.street"
    >
      <u-input
        v-model="state.street"
        :loading="loading"
      />
    </u-form-group>
    <u-form-group
      class="md:col-span-2"
      label="Número"
      name="address.number"
    >
      <u-input
        v-model="state.number"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      class="md:col-span-6 lg:col-span-4"
      label="Complemento"
      name="address.complement"
    >
      <u-input
        v-model="state.complement"
        :loading="loading"
      />
    </u-form-group>
    <u-form-group
      class="md:col-span-4"
      label="Bairro"
      name="address.neighbourhood"
    >
      <u-input
        v-model="state.neighbourhood"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      class="md:col-span-4"
      label="Cidade"
      name="address.city"
    >
      <u-input
        v-model="state.city"
        :loading="loading"
      />
    </u-form-group>
  </div>
</template>
