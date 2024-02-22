<script setup lang="ts">
  import { array, object, string } from "yup";

  type CreateClientForm = ClientDTO;

  definePageMeta({ name: "CreateClient" });

  const defaultState: CreateClientForm = {
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cnpj: "",
    rg: "",
    clientTypes: [],
    personType: "PF",
    address: {
      street: "",
      neighbourhood: "",
      city: "",
      cep: "",
      number: "",
      complement: "",
    },
  };

  const state = ref<CreateClientForm>({ ...defaultState });

  const schema = object<CreateClientForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
  });
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :schema="schema"
    :title="`Criar Cliente`"
    api-route=""
    name="clients"
    backRoute="clients"
  >
    <clients-form v-model:state="state" />
  </crud-create-and-update>
</template>
