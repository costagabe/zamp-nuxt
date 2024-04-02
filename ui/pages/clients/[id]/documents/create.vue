<script setup lang="ts">
  import { object, string } from "yup";

  definePageMeta({ name: "CreateClientDocument" });
  useHead({ title: "Novo Cliente" });

  type CreateClientDocumentProps = {
    name: string;
    type: "PERSON" | "BUILDING" | "RENT";
    publicPath: string;
  };

  const route = useRoute();

  const defaultState: CreateClientDocumentProps = {
    name: "",
    type: "PERSON",
    publicPath: "",
  };

  const state = ref<CreateClientDocumentProps>({ ...defaultState });

  const schema = object<CreateClientDocumentProps>().shape({
    name: string().required("Campo Obrigatório"),
    type: string().oneOf(["PERSON", "BUILDING", "RENT"]).required("Campo Obrigatório"),
  });
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :api-route="`clients/${route.params.id}/documents`"
    :default-update-value="defaultState"
    :schema="schema"
    :title="`Criar Documento de Cliente`"
    id-route-name="documentId"
    name="ClientDocuments"
    backRoute="ClientDocuments"
  >
    <clients-documents-form v-model:state="state" />
  </crud-create-and-update>
</template>
