export type EntryType = "IN" | "OUT" | "TRANSFER";

export type EntryDTO = {
  id?: string;
  type: EntryType;
  value: number;
  date: string;
  history: string;
  financialAccount: string;
  classificationAccount: string;
};
