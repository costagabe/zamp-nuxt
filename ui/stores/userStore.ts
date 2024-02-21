import type { MenuEnum } from "../enum/MenuEnum";

export const useUserStore = defineStore("user", () => {

  const { data: menusArray } = useFetch<Array<MenuEnum>>("/api/users/menus", { default: () => [] });

  const menus = computed<Array<any>>(() => generateMenuStructure(menusArray.value));

  return {
    menus,
  };
});
