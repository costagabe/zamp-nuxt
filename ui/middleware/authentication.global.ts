const publicRoutes = ["/login", "/register"];

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());

  if (
    to.path === from.path &&
    authenticated.value &&
    to.path !== "/" &&
    from.path !== "/" 
  )
    return;

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
