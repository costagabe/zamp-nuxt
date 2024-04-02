<script setup lang="ts">
  import { number, object, string } from "yup";
  import type { AccountDTO } from "~/ui/types/Account";

  type UpdateAccountProps = AccountDTO;

  definePageMeta({ name: "UpdateAccount" });
  useHead({ title: "Alterar Conta" });

  const defaultState: UpdateAccountProps = {
    name: "",
    code: "",
    type: "INCOME_ACCOUNT",
    balance: 0,
  };

  const state = ref<UpdateAccountProps>({ ...defaultState });

  const { loading } = storeToRefs(useAppStore());

  const schema = object<UpdateAccountProps>().shape({
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
    :title="`Alterar Conta - ${state.name}`"
    api-route="accounts"
    name="Accounts"
    backRoute="Accounts"
  >
    <accounts-form
      :state="state"
      :loading="loading"
    />
  </crud-create-and-update>
</template>
