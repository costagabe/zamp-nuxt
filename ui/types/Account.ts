export type AccountType = "INCOME_ACCOUNT" | "EXPENSE_ACCOUNT" | "FINANCIAL_ACCOUNT";

export type AccountDTO = {
  id?: string;
  name: string;
  code: string;
  type: AccountType;
  balance: number;
};
