<script setup lang="ts">
  import { number, object, string } from "yup";

  type UpdateEntryProps = EntryDTO;

  definePageMeta({ name: "UpdateEntry" });
  useHead({ title: "Alterar Entrada" });

  const defaultState: UpdateEntryProps = {
    history: "",
    date: "",
    type: "IN",
    value: 0,
    financialAccount: "",
    classificationAccount: "",
  };

  const state = ref<UpdateEntryProps>({ ...defaultState });

  const { loading } = storeToRefs(useAppStore());

  const route = useRoute();

  const schema = object<UpdateEntryProps>().shape({
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
    :title="`Alterar Lançamento`"
    :api-route="`accounts/${$route.params.id}/entries`"
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
