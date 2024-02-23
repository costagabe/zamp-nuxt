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
  import * as Yup from "yup";
  import type { PersonType } from "~/ui/types/Client";

  const schema = Yup.object().shape({
    name: Yup.string().required("Nome Completo é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    phone: Yup.string().required("Telefone é obrigatório"),
    personType: Yup.string().oneOf(["PF", "PJ"]).required("Tipo é obrigatório"),
    clientTypes: Yup.array()
      .of(Yup.string().oneOf(["LESSEE", "LESSOR"]))
      .min(1, "Tipo de cliente é obrigatório"),
    cpf: Yup.string().when("personType", {
      is: (personType: PersonType) => personType === "PF",
      then: () => Yup.string().required("CPF é obrigatório"),
      otherwise: () => Yup.string(),
    }),
    cnpj: Yup.string().when("personType", {
      is: (personType: PersonType) => personType === "PJ",
      then: () => Yup.string().required("CNPJ é obrigatório"),
      otherwise: () => Yup.string(),
    }),
    rg: Yup.string().required("RG é obrigatório"),
    address: Yup.object().shape({
      street: Yup.string().required("Rua é obrigatória"),
      neighbourhood: Yup.string().required("Bairro é obrigatório"),
      city: Yup.string().required("Cidade é obrigatória"),
      cep: Yup.string()
        .matches(/^[0-9]{5}-[0-9]{3}$/, "CEP Inválido")
        .required("CEP é obrigatório"),
      number: Yup.number().typeError("Número inválido").required("Número é obrigatório"),
      complement: Yup.string(),
    }),
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
