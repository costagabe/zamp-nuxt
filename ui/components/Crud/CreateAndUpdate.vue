<script setup lang="ts" generic="T extends object, K extends object">
  import type { ObjectSchema } from "yup";
  import type { FormSubmitEvent } from "#ui/types";
  import { type FetchError } from "ofetch";
  import { getValidationsFromApiError } from "~/ui/util/ExceptionUtils";

  type CreateAndUpdateProps = {
    name: string;
    apiRoute: string;
    title: string;
    backRoute: string;
    schema: ObjectSchema<any>;
    defaultUpdateValue: T;
  };

  const [state] = defineModel<T>("state", { default: {} as T });

  const props = defineProps<CreateAndUpdateProps>();
  const emit = defineEmits<{ (e: "submit"): void }>();

  const toast = useToast();

  const form = ref();

  const route = useRoute();

  const { loading } = storeToRefs(useAppStore());

  const id = computed(() => route.params.id);

  const { data, error } = useAsyncData(
    `${props.name}UpdateData`,
    () => $fetch<T>(`/api/${props.apiRoute}/${id.value}`),
    { default: () => props.defaultUpdateValue as T, watch: [id], immediate: !!id.value }
  );

  watch(error, (value) => {
    if (value?.data) {
      const data = value.data as ApiError;

      toast.add({
        title: data.title,
        color: "red",
      });
    }
  });

  watch(data, (value) => {
    state.value = value as T;
  });
  async function onSubmitCreate(event: FormSubmitEvent<K>) {
    try {
      
      loading.value = true;

      await $fetch(`/api/${props.apiRoute}`, {
        method: "POST",
        body: event.data,
      });

      toast.add({
        title: "Formulário enviado com sucesso",
        color: "emerald",
      });

      state.value = { ...props.defaultUpdateValue };
      emit("submit");
    } catch (e) {
      const error = e as FetchError<ApiError>;
      form.value.setErrors(getValidationsFromApiError(error));
    } finally {
      loading.value = false;
    }
  }

  async function onSubmitUpdate(event: FormSubmitEvent<K>) {
    try {
      loading.value = true;

      await $fetch(`/api/${props.apiRoute}/${id.value}`, {
        method: "PUT",
        body: event.data,
      });

      toast.add({
        title: "Alteração realizada com sucesso",
        color: "emerald",
      });
    } catch (e) {
      const error = e as FetchError<ApiError>;
      form.value.setErrors(getValidationsFromApiError(error));
    } finally {
      loading.value = false;
    }
  }

  const onSubmit = computed(() => (id.value ? onSubmitUpdate : onSubmitCreate));
</script>

<template>
  <u-card class="w-10/12">
    <template #header>
      <div class="flex flex-1 align-middle justify-between">
        <p class="text-white align-bottom">{{ title }}</p>
        <u-button :to="{ name: backRoute }">Voltar</u-button>
      </div>
    </template>

    <template #default>
      <u-form
        :schema="schema"
        :state="state"
        :validate-on="['submit']"
        @submit="onSubmit"
        class="space-y-4"
        ref="form"
      >
        <slot />
        <u-button
          block
          class="mt-4"
          type="submit"
          :loading="loading"
        >
          Enviar
        </u-button>
      </u-form>
    </template>
  </u-card>
</template>
