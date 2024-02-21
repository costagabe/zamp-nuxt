const publicRoutes = ["/login", "/register"];

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());

  if(to.path === from.path) return;

  $fetch("/api/auth", { method: "GET" }).catch(() => {
    authenticated.value = false;
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
