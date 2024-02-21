const publicRoutes = ["/login", "/register"];

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated, level } = storeToRefs(useAuthStore());

  if (to.path === from.path && authenticated.value && level.value !== null) return;

  $fetch("/api/auth", { method: "GET" })
  .then((res) => {
    level.value = res as number;
  })
  .catch(() => {
    console.log("User is not authenticated");
    authenticated.value = false;
    console.log("User is not authenticated");
  });

  if (publicRoutes.includes(to.path)) {
    if (authenticated.value) {
      return navigateTo("/");
    }
    return;
  } else {
    if (!authenticated.value) {
      return navigateTo("/login");
    }
  }
});
