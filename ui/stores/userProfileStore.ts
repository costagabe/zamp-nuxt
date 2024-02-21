import type { MenuEnum } from "../enum/MenuEnum";
import { useAppStore } from "./appStore";

export const useUserProfileStore = defineStore("userProfile", () => {
  const { loading } = storeToRefs(useAppStore());

  const updates = ref(0);

  const { data: userProfileList, status } = useAsyncData(
    "userProfileSelectList",
    () => $fetch<Array<SelectOption>>("/api/user-profiles/select-list"),
    {
      default: () => [] as Array<SelectOption>,
      watch: [updates],
    }
  );

  watch(status, (status) => {
    loading.value = status === "pending";
  });

  return {
    userProfileList,
    updates,
  };
});
