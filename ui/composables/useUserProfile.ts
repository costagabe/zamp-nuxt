import type { PermissionDTO } from "../types/UserProfile";

export function useUserProfile() {
  const { loading } = storeToRefs(useAppStore());
  const route = useRoute();

  const shouldFetchPermission = computed(() => route.name === "UpdateUserProfile");

  const { data: userProfileList, status: userProfileListStatus } = useAsyncData(
    "userProfileSelectList",
    () => $fetch<Array<SelectOption>>("/server-api/user-profiles/select-list"),
    {
      default: () => [] as Array<SelectOption>,
    }
  );

  const { data: userProfilePermissions, status: userProfilePermissionsStatus } = useAsyncData(
    "userProfilePermissionList",
    () => $fetch<Array<PermissionDTO>>("/server-api/user-profiles/permission-list"),
    {
      watch: [shouldFetchPermission],
      default: () => [] as Array<PermissionDTO>,
      immediate: shouldFetchPermission.value,
    }
  );

  watch(
    () => [userProfileListStatus.value, userProfilePermissionsStatus.value],
    (status) => {
      loading.value = status.some((v) => v === "pending");
    },
    { immediate: true }
  );

  return {
    userProfileList,
    userProfilePermissions,
  };
}
