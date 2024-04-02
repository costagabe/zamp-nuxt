<script setup lang="ts">
  import { number, object, string } from "yup";

  type CreateEntryProps = EntryDTO;

  definePageMeta({ name: "CreateEntry" });
  useHead({ title: "Nova Entrada" });

  const route = useRoute();

  const defaultState: CreateEntryProps = {
    history: "",
    date: "",
    type: "IN",
    value: 0,
    financialAccount: route.params.id as string,
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

  const type = computed<Array<AccountType>>(() =>
    state.value.type === "IN"
      ? ["INCOME_ACCOUNT"]
      : state.value.type === "OUT"
        ? ["EXPENSE_ACCOUNT"]
        : ["FINANCIAL_ACCOUNT"]
  );

  const { data: classificationAccounts } = useAsyncData<SelectOption[]>(
    "classificationAccounts",
    () =>
      $fetch<SelectOption[]>("/server-api/accounts/select-list", {
        query: { type: type.value, accountId: route.params.id },
      }),
    { default: () => [], watch: [type] }
  );
</script>

<template>
  <crud-create-and-update
    v-model:state="state"
    :default-update-value="defaultState"
    :loading="loading"
    :schema="schema"
    :title="`Criar Lançamento de  Conta`"
    :api-route="`accounts/${$route.params.id}/entries`"
    :reset-on-submit="false"
    backRoute="Entries"
    id-route-name="entryId"
    name="Entries"
  >
    <accounts-entries-form
      v-model:state="state"
      :classificationAccounts="classificationAccounts"
    />
  </crud-create-and-update>
</template>
