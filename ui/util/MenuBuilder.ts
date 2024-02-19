import { MenuCategoryEnum, MenuEnum } from "../enum/MenuEnum";
import { AdjustmentsHorizontalIcon, BriefcaseIcon, HomeIcon, UserCircleIcon, UserIcon, WalletIcon } from "@heroicons/vue/24/solid";

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
  [MenuCategoryEnum.CASH_BOOK]: {
    [MenuEnum.ACCOUNTS_MENU]: {
      to: "/accounts",
      icon: "i-heroicons-wallet",
      label: "Contas",
    },
  },
};

const menuMap: Record<MenuEnum, MenuCategoryEnum> = {
  [MenuEnum.ACCOUNTS_MENU]: MenuCategoryEnum.CASH_BOOK,
  [MenuEnum.COMPANIES_MENU]: MenuCategoryEnum.SYSTEM,
  [MenuEnum.HOME_MENU]: MenuCategoryEnum.GENERAL,
  [MenuEnum.PROFILES_MENU]: MenuCategoryEnum.SYSTEM,
  [MenuEnum.USERS_MENU]: MenuCategoryEnum.SYSTEM,
  [MenuEnum.PARAMETERS_MENU]: MenuCategoryEnum.SYSTEM,
};

export function generateMenuStructure(userMenus: Array<MenuEnum>) {

  const menuStructureResponse: Record<MenuCategoryEnum, Partial<Record<MenuEnum, MenuProps>>> = {
    [MenuCategoryEnum.GENERAL]: {},
    [MenuCategoryEnum.SYSTEM]: {},
    [MenuCategoryEnum.CASH_BOOK]: {},
  };

  userMenus.forEach((menu) => {
    if (menuMap[menu]) {
      menuStructureResponse[menuMap[menu]] = menuStructure[menuMap[menu]];
    }
  });

console.log(menuStructureResponse);

console.log();

  return Object.keys(menuStructureResponse).map((key) => ([...Object.keys(menuStructureResponse[key]).map(key2 => menuStructureResponse[key][key2])]));
}
