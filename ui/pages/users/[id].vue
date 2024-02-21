<script setup lang="ts">
  import type { SelectOption } from "~/ui/types/SelectOption";
  import type { FormSubmitEvent } from "#ui/types";
  import { object, string, type InferType, array } from "yup";
  import { type FetchError } from "ofetch";
  import { getValidationsFromApiError } from "~/ui/util/ExceptionUtils";
  import { useUserProfileStore } from "~/ui/stores/userProfileStore";

  type UpdateUserForm = {
    id: string;
    name: string;
    email: string;
    profileIds: Array<string>;
    situation: "ACTIVE" | "INACTIVE";
  };

  definePageMeta({ name: "UpdateUser" });

  const toast = useToast();

  const form = ref();

  const state = ref<UpdateUserForm>({
    id: "",
    name: "",
    email: "",
    profileIds: [],
    situation: "INACTIVE",
  });

  const route = useRoute();

  const id = computed(() => route.params.id);

  const situation = computed({
    get() {
      return state.value.situation === "ACTIVE";
    },
    set(value: boolean) {
      state.value.situation = value ? "ACTIVE" : "INACTIVE";
    },
  });

  const situationLabel = computed(() => (situation.value ? "Situação: Ativo" : "Situação: Inativo"));

  const { loading } = storeToRefs(useAppStore());

  const { userProfileList } = storeToRefs(useUserProfileStore());

  const schema = object<UpdateUserForm>().shape({
    name: string().trim().min(5, "Preencha o nome completo").required("Campo Obrigatório"),
    email: string().email("Email inválido").required("Campo Obrigatório"),
    profileIds: array().of(string().uuid("Campo inválido")).required("Campo Obrigatório"),
    situation: string().oneOf(["ACTIVE", "INACTIVE"], "Situação inválida").required("Campo Obrigatório"),
  });

  const { data, error } = useAsyncData(
    "userUpdateData",
    () => $fetch<UpdateUserForm>(`/api/users/${id.value}`),
    { default: () => ({ id: "", name: "", email: "", profileIds: [], situation: "INACTIVE" as any }) }
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
    state.value = value;
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
  <crud-create-and-update
    v-model:state="state"
    :title="`Alterar Usuário - ${state.name}`"
    :schema="schema"
    :loading="loading"
    @submit="onSubmit"
    backRoute="Users"
  >
    <div class="flex flex-1 justify-between gap-8">
      <div class="flex flex-1">
        <u-form-group
          class="w-full"
          label="Nome Completo"
          name="name"
        >
          <u-input
            v-model="state.name"
            :loading="loading"
          />
        </u-form-group>
      </div>
      <div class="w-32 flex">
        <u-form-group
          :label="situationLabel"
          class="flex flex-col justify-between"
          name="situation"
        >
          <u-toggle
            v-model="situation"
            :loading="loading"
          />
        </u-form-group>
      </div>
    </div>

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
      <user-profiles-select
        v-model:profiles="state.profileIds"
        v-model:user-profile-list="userProfileList"
        :loading="loading"
      />
    </u-form-group>
  </crud-create-and-update>
</template>
