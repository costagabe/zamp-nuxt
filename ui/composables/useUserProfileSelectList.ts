export function useUserProfileSelectList() {
  const { loading } = storeToRefs(useAppStore());

  const { data: userProfileList, status } = useAsyncData(
    "userProfileSelectList",
    () => $fetch<Array<SelectOption>>("/api/user-profiles/select-list"),
    {
      default: () => [] as Array<SelectOption>,
    }
  );

  watch(status, (status) => {
    loading.value = status === "pending";
  });

  return {
    userProfileList,
  };
}
