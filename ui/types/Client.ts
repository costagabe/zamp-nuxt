export type ClientType = "LESSEE" | "LESSOR";
export type PersonType = "PF" | "PJ";

export type ClientDTO = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cnpj: string;
  rg: string;

  clientTypes: Array<ClientType>;
  personType: PersonType;

  address: AddressDTO;
};
