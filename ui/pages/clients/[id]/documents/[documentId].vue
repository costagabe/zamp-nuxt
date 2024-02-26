<script setup lang="ts">
  import { object, string } from "yup";

  definePageMeta({ name: "UpdateClientDocument" });
  type UpdateClientDocumentProps = {
    name: string;
    type: "PERSON" | "BUILDING" | "RENT";
    publicPath: string;
  };

  const route = useRoute();

  const defaultState: UpdateClientDocumentProps = {
    name: "",
    type: "PERSON",
    publicPath: "",
  };

  const state = ref<UpdateClientDocumentProps>({ ...defaultState });

  const schema = object<UpdateClientDocumentProps>().shape({
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
