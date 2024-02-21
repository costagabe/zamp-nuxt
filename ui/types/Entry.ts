export type EntryType = "IN" | "OUT" | "TRANSFER";

export type EntryDTO = {
  id?: string;
  type: EntryType;
  value: number;
  date: string;
  history: string;
  finnantialAccount: string;
  classificationAccount: string;
};
