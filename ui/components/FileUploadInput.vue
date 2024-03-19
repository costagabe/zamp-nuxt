<script setup lang="ts">
  const props = defineProps<{
    filePrefixName: string;
    disabled: boolean;
    fileName: string | null;
    error: boolean;
  }>();

  const emit = defineEmits<{ (e: "uploadSuccess", value: string): void; (e: "delete"): void }>();

  const { loading } = storeToRefs(useAppStore());
  const toast = useToast();

  const file = ref();
  const internalFileLink = ref<string | null>(null);

  const inputColor = computed(() => (props.error ? "red-400" : "sambuca-600"));

  const realFileName = computed(() => props.fileName || internalFileLink.value);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  async function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0] as File;

    const base64 = await toBase64(file);
    const fileName = props.filePrefixName + "." + file.name.split(".").pop();

    try {
      loading.value = true;
      const res = await $fetch("/api/files/upload", {
        method: "POST",
        body: { file: base64, fileName },
      });

      emit("uploadSuccess", res);
      handleFileLink(res);

      toast.add({ title: "Documento criado com sucesso", color: "green" });
    } catch (error) {
      toast.add({ title: "Erro ao criar documento", color: "red" });
    } finally {
      loading.value = false;
    }
  }

  async function handleFileLink(publicPath: string) {
    const link = await $fetch(`/api/files`, { query: { id: publicPath } });
    internalFileLink.value = link;
  }

  async function downloadFile() {
    const res = await (await fetch(internalFileLink.value!)).blob();

    const url = window.URL.createObjectURL(res);
    const a = document.createElement("a");
    a.href = url;
    a.download = props.filePrefixName;
    a.click();
  }

  function handleInputClick() {
    if (!realFileName.value) {
      file.value.click();
    }
  }
</script>

<template>
  <div class="w-full">
    <input
      @change="handleInput"
      :disabled="disabled"
      hidden
      ref="file"
      type="file"
    />
    <div
      :class="`flex items-center justify-center w-full h-32 cursor-pointer rounded-lg border border-${inputColor}`"
    >
      <div
        v-if="realFileName"
        class="flex justify-between w-full px-4"
      >
        <p>{{ props.filePrefixName }}</p>
        <div class="grid grid-cols-2 gap-2">
          <u-button @click="downloadFile">
            <u-icon name="i-heroicons-arrow-down-tray" />
            Baixar
          </u-button>
          <u-button @click.prevent="emit('delete')">
            <u-icon name="i-heroicons-trash" />
            Remover
          </u-button>
        </div>
      </div>
      <div
        v-else
        @click="handleInputClick"
        :class="`flex flex-col items-center  hover:cursor-pointer w-full h-full justify-center text-${inputColor}`"
      >
        <u-icon
          v-if="!disabled"
          name="i-heroicons-plus"
          class="text-5xl"
        />
        <u-icon
          v-else
          name="i-heroicons-no-symbol"
          class="text-5xl"
        />
        <span
          v-if="!disabled"
          class="mt-2 text-base leading-normal"
          >Clique para adicionar um arquivo</span
        >
      </div>
    </div>
  </div>
</template>
