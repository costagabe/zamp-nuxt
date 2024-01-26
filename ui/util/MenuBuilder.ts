import { MenuCategoryEnum, MenuEnum } from "../enum/MenuEnum";
import { AdjustmentsHorizontalIcon, BriefcaseIcon, HomeIcon, UserCircleIcon, UserIcon, WalletIcon } from "@heroicons/vue/24/solid";

export type MenuProps = {
  path: string;
  icon: Component;
  title: string;
};

export type MenuStructure = Record<MenuCategoryEnum, Partial<Record<MenuEnum, MenuProps>>>;

export const menuStructure: Record<MenuCategoryEnum, Partial<Record<MenuEnum, MenuProps>>> = {
  [MenuCategoryEnum.GENERAL]: {
    [MenuEnum.HOME_MENU]: {
      path: "/",
      icon: HomeIcon,
      title: "Home",
    },
  },
  [MenuCategoryEnum.SYSTEM]: {
    [MenuEnum.COMPANIES_MENU]: {
      path: "/companies",
      icon: BriefcaseIcon,
      title: "Empresas",
    },
    [MenuEnum.PROFILES_MENU]: {
      path: "/profiles",
      icon: UserCircleIcon,
      title: "Perfis de Usuário",
    },
    [MenuEnum.USERS_MENU]: {
      path: "/users",
      icon: UserIcon,
      title: "Usuários",
    },
    [MenuEnum.PARAMETERS_MENU]: {
      path: "/parameters",
      icon: AdjustmentsHorizontalIcon,
      title: "Parâmetros",
    },
  },
  [MenuCategoryEnum.CASH_BOOK]: {
    [MenuEnum.ACCOUNTS_MENU]: {
      path: "/accounts",
      icon: WalletIcon,
      title: "Contas",
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

  return menuStructureResponse;
}
