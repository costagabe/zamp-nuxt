<script setup lang="ts">
  import { number, object, string } from "yup";

  type CreateEntryProps = EntryDTO;

  definePageMeta({ name: "CreateEntry" });

  const defaultState: CreateEntryProps = {
    history: "",
    date: "",
    type: "IN",
    value: 0,
    finnantialAccount: "",
    classificationAccount: "",
  };

  const state = ref<CreateEntryProps>({ ...defaultState });

  const { loading } = storeToRefs(useAppStore());

  const schema = object<CreateEntryProps>().shape({
    history: string().trim(),
    type: string().oneOf(["IN", "OUT"]).required("Campo Obrigatório"),
    value: number().required("Campo Obrigatório"),
    classificationAccount: string().trim().required("Campo Obrigatório"),
  });
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :loading="loading"
    :schema="schema"
    :title="`Criar Lançamento de  Conta`"
    :api-route="`accounts/${$route.params.id}/entries`"
    backRoute="Entries"
    id-route-name="entryId"
    name="Entries"
  >
    <accounts-entries-form v-model:state="state" />
  </crud-create-and-update>
</template>
