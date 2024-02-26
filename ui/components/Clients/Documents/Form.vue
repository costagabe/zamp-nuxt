<script setup lang="ts">
  const [state] = defineModel<{
    name: string;
    type: "PERSON" | "BUILDING" | "RENT";
    publicPath: string;
  }>("state", { default: {} });

  const toast = useToast();
  const route = useRoute();


  const { loading } = storeToRefs(useAppStore());
  const bucketFileName = ref<string>("");

  const filePrefixName = computed(() => bucketFileName.value || `${route.params.id}-${state.value.name}`);

  const fileName = computed(() => state.value.publicPath?.split("/").pop()! ?? null);

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
  </u-form-group>
</template>
