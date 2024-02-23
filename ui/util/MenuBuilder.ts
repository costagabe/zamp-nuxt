import { MenuCategoryEnum, MenuEnum } from "../enum/MenuEnum";

export type MenuProps = {
  to: string;
  icon: string;
  label: string;
};

export type MenuStructure = Record<MenuCategoryEnum, Partial<Record<MenuEnum, MenuProps>>>;

export const menuStructure: Record<MenuCategoryEnum, Partial<Record<MenuEnum, MenuProps>>> = {
  [MenuCategoryEnum.GENERAL]: {
    [MenuEnum.HOME_MENU]: {
      to: "/",
      icon: "i-heroicons-home",
      label: "Home",
    },
  },
  [MenuCategoryEnum.SYSTEM]: {
    [MenuEnum.COMPANIES_MENU]: {
      to: "/companies",
      icon: "i-heroicons-briefcase",
      label: "Empresas",
    },
    [MenuEnum.PROFILES_MENU]: {
      to: "/profiles",
      icon: "i-heroicons-user-circle",
      label: "Perfis de Usuário",
    },
    [MenuEnum.USERS_MENU]: {
      to: "/users",
      icon: "i-heroicons-user",
      label: "Usuários",
    },
    [MenuEnum.PARAMETERS_MENU]: {
      to: "/parameters",
      icon: "i-heroicons-adjustments-horizontal",
      label: "Parâmetros",
    },
  },
  [MenuCategoryEnum.CRM]: {
    [MenuEnum.USERS_MENU]: {
      to: "/clients",
      icon: "i-heroicons-user-group",
      label: "Clientes",
    },
  },
  [MenuCategoryEnum.CASH_BOOK]: {
    [MenuEnum.ACCOUNTS_MENU]: {
      to: "/accounts",
      icon: "i-heroicons-wallet",
      label: "Contas",
    },
  },
};

const menuMap: Record<MenuEnum, MenuCategoryEnum> = {
  [MenuEnum.CLIENTS_MENU]: MenuCategoryEnum.CRM,
  [MenuEnum.ACCOUNTS_MENU]: MenuCategoryEnum.CASH_BOOK,
  [MenuEnum.COMPANIES_MENU]: MenuCategoryEnum.SYSTEM,
  [MenuEnum.HOME_MENU]: MenuCategoryEnum.GENERAL,
  [MenuEnum.PROFILES_MENU]: MenuCategoryEnum.SYSTEM,
  [MenuEnum.USERS_MENU]: MenuCategoryEnum.SYSTEM,
  [MenuEnum.PARAMETERS_MENU]: MenuCategoryEnum.SYSTEM,
};

export function generateMenuStructure(userMenus: Array<MenuEnum>) {
  const menuStructureResponse: Record<MenuCategoryEnum, Array<MenuProps>> = {
    [MenuCategoryEnum.GENERAL]: [],
    [MenuCategoryEnum.SYSTEM]: [],
    [MenuCategoryEnum.CRM]: [],
    [MenuCategoryEnum.CASH_BOOK]: [],
  };

  userMenus.forEach((menu) => {
    if (menuMap[menu]) {
      menuStructureResponse[menuMap[menu]] = Object.keys(menuStructure[menuMap[menu]]).map(
        (key) => menuStructure[menuMap[menu]][key as MenuEnum] as MenuProps
      );
    }
  });

  const arrays = Object.keys(menuStructureResponse).map(
    (key) => menuStructureResponse[key as MenuCategoryEnum]
  ).filter((menu) => menu.length);

  return arrays;
}
