const publicRoutes = ["/login", "/register"];

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());

  if (to.path === from.path && authenticated.value) return;

  $fetch("/api/auth", { method: "GET" }).catch(() => {
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
