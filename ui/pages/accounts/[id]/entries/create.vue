<script setup lang="ts">
  import { number, object, string } from "yup";
  import type { AccountDTO } from "~/ui/types/Account";

  type CreateAccountProps = AccountDTO;

  definePageMeta({ name: "CreateEntry" });

  const defaultState: CreateAccountProps = {
    name: "",
    code: "",
    type: "INCOME_ACCOUNT",
    balance: 0,
  };

  const state = ref<CreateAccountProps>({ ...defaultState });

  const { loading } = storeToRefs(useAppStore());

  const schema = object<CreateAccountProps>().shape({
    name: string().trim().required("Campo Obrigatório"),
    code: string().trim().required("Campo Obrigatório"),
    type: string()
      .oneOf(["INCOME_ACCOUNT", "EXPENSE_ACCOUNT", "FINANCIAL_ACCOUNT"])
      .required("Campo Obrigatório"),
    balance: number().required("Campo Obrigatório"),
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
    name="Entries"
    backRoute="Entries"
  >
    entries...
  </crud-create-and-update>
</template>
