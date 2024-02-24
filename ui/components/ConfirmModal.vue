<script setup lang="ts">
  const emit = defineEmits(["confirm"]);

  const [model] = defineModel<boolean>("modelValue", { default: false });

  const background = "bg-red-600";
  const classes = {
    body: { background },
    header: { background },
    footer: { background },
    divide: "'divide-y divide-red-400 dark:divide-red-400",
  };

  function handleConfirm() {
    model.value = false;
    emit("confirm");
  }
</script>

<template>
  <UModal v-model="model">
    <u-card :ui="classes">
      <template #header>
        <h3 class="text-xl text-white font-semibold">Tem certeza que deseja continuar?</h3>
      </template>
      <template #default> <div class="text-white">Essa ação nao pode ser desfeita.</div></template>
      <template #footer>
        <div class="flex justify-end space-x-4">
          <u-button
            @click="model = false"
            class="bg-green-600"
            color=""
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
