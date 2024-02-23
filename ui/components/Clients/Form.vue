<script setup lang="ts">
  const [state] = defineModel<ClientDTO>("state", { default: {} });

  const { loading } = storeToRefs(useAppStore());

  const personType = computed({
    get: () => state.value.personType === "PF",
    set: (value: boolean) => {
      state.value.personType = value ? "PF" : "PJ";
      if (value) {
        state.value.cnpj = "";
      } else {
        state.value.cpf = "";
      }
    },
  });

  const personTypeLabel = computed(() => `Tipo: ${personType.value ? "Pessoa Física" : "Pessoa Jurídica"}`);

  const types = [
    { label: "Locador", value: "LESSOR" },
    { label: "Locatário", value: "LESSEE" },
  ];
</script>

<template>
  <h2>Dados Pessoais</h2>
  <div class="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4">
    <div class="sm:col-span-1 md:col-span-2 xl:col-span-3 flex justify-end">
      <u-form-group
        :label="personTypeLabel"
        class="justify-between items-center flex flex-col"
        name="personType"
      >
        <u-toggle v-model="personType" />
      </u-form-group>
    </div>
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
      v-if="personType"
      label="CPF"
      name="cpf"
    >
      <u-input
        v-model="state.cpf"
        :loading="loading"
      />
    </u-form-group>

    <u-form-group
      v-else
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
    <u-form-group
      label="Tipo de cliente"
      name="clientTypes"
    >
      <u-select-menu
        v-model="state.clientTypes"
        :loading="loading"
        :options="types"
        multiple
        option-attribute="label"
        value-attribute="value"
        placeholder="Tipo de cliente"
      >
      </u-select-menu>
    </u-form-group>
  </div>

  <u-divider class="mt-8 mb-0" />
  <address-form v-model:state="state.address" />
</template>
