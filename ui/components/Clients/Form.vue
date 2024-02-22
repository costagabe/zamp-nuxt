<script setup lang="ts">
  const [state] = defineModel<ClientDTO>("state", { default: {} });

  const { loading } = storeToRefs(useAppStore());
</script>

<template>
  <h2>Dados Pessoais</h2>
  <div class="grid grid-cols-2 gap-x-4 gap-y-4">
    <u-form-group
      label="Nome Completo"
      name="name"
    >
      <u-input
        v-model="state.name"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      label="Email"
      name="email"
    >
      <u-input
        v-model="state.email"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      label="Telefone"
      name="phone"
    >
      <u-input
        v-model="state.phone"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      label="CPF"
      name="cpf"
    >
      <u-input
        v-model="state.cpf"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      label="CNPJ"
      name="cnpj"
    >
      <u-input
        v-model="state.cnpj"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      label="RG"
      name="rg"
    >
      <u-input
        v-model="state.rg"
        :loading="loading"
      />
    </u-form-group>
  </div>

  <u-divider class="mt-8 mb-0" />
  <address-form v-model:state="state.address" />
</template>
