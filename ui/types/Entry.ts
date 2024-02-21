export type EntryType = "IN" | "OUT" ;

export type EntryDTO = {
  id?: string;
  name: string;
  code: string;
  type: EntryType;
  balance: number;
};
