const publicRoutes = ["/login", "/register"];

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuthStore());
    console.log(authenticated.value);
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

    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    // if (to.path !== '/') {
    //   return navigateTo('/')
    // }
});
