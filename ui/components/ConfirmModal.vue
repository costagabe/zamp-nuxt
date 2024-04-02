<script setup lang="ts">
  const emit = defineEmits(["confirm"]);

  const [model] = defineModel<boolean>("modelValue", { default: false });

  function handleConfirm() {
    model.value = false;
    emit("confirm");
  }
</script>

<template>
  <UModal v-model="model">
    <u-card >
      <template #header>
        <h3 class="text-xl text-white font-semibold">Tem certeza que deseja continuar?</h3>
      </template>
      <template #default> <div class="text-white">Essa ação nao pode ser desfeita.</div></template>
      <template #footer>
        <div class="flex justify-end space-x-4">
          <u-button
            @click="() => model = false"
            class="bg-green-600"
            color="green"
          >
            <b class="text-white">Cancelar</b>
          </u-button>
          <u-button
            @click="handleConfirm"
            color="red"
          >
            <b class="text-white">Confirmar</b>
          </u-button>
        </div>
      </template>
    </u-card>
  </UModal>
</template>
