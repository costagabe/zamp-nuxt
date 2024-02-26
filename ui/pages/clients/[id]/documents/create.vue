<script setup lang="ts">
  import { object, string } from "yup";

  definePageMeta({ name: "CreateClientDocument" });
  type CreateClientDocumentProps = {
    name: string;
    type: "PERSON" | "BUILDING" | "RENT";
    publicPath: string;
  };

  const toast = useToast();
  const route = useRoute();

  const defaultState: CreateClientDocumentProps = {
    name: "",
    type: "PERSON",
    publicPath: "",
  };

  const state = ref<CreateClientDocumentProps>({ ...defaultState });

  const { loading } = storeToRefs(useAppStore());
  const bucketFileName = ref<string>("");

  const filePrefixName = computed(() => bucketFileName.value || `${route.params.id}-${state.value.name}`);

  const fileName = computed(() => state.value.publicPath.split("/").pop()! ?? null);

  const schema = object<CreateClientDocumentProps>().shape({
    name: string().required("Campo Obrigatório"),
    type: string().oneOf(["PERSON", "BUILDING", "RENT"]).required("Campo Obrigatório"),
  });

  function handleUploadSuccess(publicPath: string) {
    state.value.publicPath = publicPath;
    bucketFileName.value = publicPath.split("/").pop()!;
  }

  function handleDelete() {
    state.value.publicPath = "";
    bucketFileName.value = "";
  }
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
    <u-form-group
      label="Nome"
      name="name"
    >
      <u-input
        v-model="state.name"
        :loading="loading"
        placeholder="Ex. RG, CPF, CNH"
      />
    </u-form-group>
    <u-form-group
      label="Arquivo"
      name="file"
    >
      <file-upload-input
        :disabled="!state.name"
        :file-prefix-name="filePrefixName"
        :file-name="fileName"
        @upload-success="handleUploadSuccess"
        @delete="handleDelete"
      />

      <!-- <u-input
        :loading="loading"
        @input="handleInput"
        ref="fileRef"
        type="file"
      /> -->
    </u-form-group>
  </crud-create-and-update>
</template>
