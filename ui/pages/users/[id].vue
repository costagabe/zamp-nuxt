<script setup lang="ts">
  import type { SelectOption } from "~/ui/types/SelectOption";
  import type { FormSubmitEvent } from "#ui/types";
  import { object, string, type InferType, array } from "yup";
  import { type FetchError } from "ofetch";
  import { getValidationsFromApiError } from "~/ui/util/ExceptionUtils";

  definePageMeta({ name: "UpdateUser" });

  type UpdateUserForm = {
    id: string;
    name: string;
    email: string;
    profileIds: Array<string>;
  };

  const schema = object<UpdateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
  });

  type Schema = InferType<typeof schema>;

  const toast = useToast();

  const { data: userProfileList, status } = useAsyncData(
    "userProfileSelectList",
    () => $fetch<Array<SelectOption>>("/api/user-profiles/select-list"),
    {
      default: () => [],
    }
  );

  const statee = ref<UpdateUserForm>({
    id: "",
    name: "",
    email: "",
    profileIds: [],
  });

  const form = ref();

  const loading = ref(false);

  const route = useRoute();

  const id = computed(() => route.params.id);

  watch(status, (status) => {
    loading.value = status === "pending";
  });

  const { data: state, error } = useAsyncData(
    "userUpdateData",
    () => $fetch<UpdateUserForm>(`/api/users/${id.value}`),
    { default: () => ({ id: "", name: "", email: "", profileIds: [] }) }
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

  async function onSubmit(event: FormSubmitEvent<UpdateUserForm>) {
    try {
      loading.value = true;

      await $fetch(`/api/users/${id.value}`, {
        method: "PUT",
        body: event.data,
      });

      toast.add({
        title: "Usuário alterado com sucesso",
        color: "emerald",
      });
      
    } catch (e) {
      const error = e as FetchError<ApiError>;
      form.value.setErrors(getValidationsFromApiError(error));
      
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <u-card class="w-10/12">
    <template #header>
      <div class="flex flex-1 align-middle justify-between">
        <p class="text-white align-bottom">Novo Usuário</p>
        <u-button :to="{ name: 'Users' }">Voltar</u-button>
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
        <u-form-group
          label="Nome Completo"
          name="name"
        >
          <u-input
            v-model="state.name"
            :loading="loading"
          />
        </u-form-group>

        <u-form-group
          label="E-mail"
          name="email"
        >
          <u-input
            v-model="state.email"
            :loading="loading"
          />
        </u-form-group>

        <u-form-group
          label="Perfil"
          name="profileIds"
        >
          <u-select-menu
            v-model="state.profileIds"
            :loading="loading"
            :options="userProfileList"
            :search-attributes="['label']"
            multiple
            option-attribute="label"
            value-attribute="value"
            placeholder="Perfil do Usuário"
            searchable
            searchable-placeholder="Procurar perfil"
          />
        </u-form-group>
        <u-button
          block
          class="mt-4"
          type="submit"
          :loading="loading"
        >
          Atualizar Usuário
        </u-button>
      </u-form>
    </template>
  </u-card>
</template>
