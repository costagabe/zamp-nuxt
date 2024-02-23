import type { MenuEnum } from "../enum/MenuEnum";

export const useUserStore = defineStore("user", () => {
  const { authenticated } = storeToRefs(useAuthStore());

  const { data: menusArray } = useFetch<Array<MenuEnum>>("/api/users/menus", {
    watch: [authenticated],
    default: () => [],
  });

  const menus = computed<Array<any>>(() => generateMenuStructure(menusArray.value));

  return {
    menus,
  };
});
