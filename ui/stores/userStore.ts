import type { MenuCategoryEnum, MenuEnum } from "../enum/MenuEnum";
import type { MenuProps, MenuStructure } from "../util/MenuBuilder";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();

  const { data: menusArray, error } = useFetch<Array<MenuEnum>>("/api/users/menus");

  const menus = computed<Partial<MenuStructure>>(() => (menusArray.value ? generateMenuStructure(menusArray.value) : {}));

  return {
    menus,
  };
});
