<script setup lang="ts">
  import { array, object, string } from "yup";

  type UpdateForm = {
    id: string;
    name: string;
    email: string;
    profileIds: Array<string>;
    situation: "ACTIVE" | "INACTIVE";
  };

  definePageMeta({ name: "UpdateClient" });

  const defaultState: UpdateForm = {
    id: "",
    name: "",
    email: "",
    profileIds: [],
    situation: "INACTIVE",
  };
  const state = ref<UpdateForm>({ ...defaultState });

  const schema = object<UpdateForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
    situation: string().oneOf(["ACTIVE", "INACTIVE"], "Situação inválida").required("Campo Obrigatório"),
  });
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :schema="schema"
    :title="`Atualiar Cliente - ${state.name}`"
    api-route=""
    backRoute="clients"
    name="clients"
  >
    
  </crud-create-and-update>
</template>
