import type { MenuEnum } from "../enum/MenuEnum";
import type { MenuStructure } from "../util/MenuBuilder";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();

  const { data: menusArray } = useFetch<Array<MenuEnum>>("/api/users/menus", { default: () => [] });

  const menus = computed<Array<any>>(() => generateMenuStructure(menusArray.value));

  return {
    menus,
  };
});
