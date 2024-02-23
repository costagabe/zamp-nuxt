import { ofetch } from "ofetch";
export default defineNuxtPlugin((_nuxtApp) => {
  const { authenticated } = storeToRefs(useAuthStore());

  const router = useRouter();

  globalThis.$fetch = ofetch.create({
    onResponseError({ response }) {
      if (response && response.status === 401) {
        authenticated.value = false;
        router.push("/login");
      } else {
        authenticated.value = true;
      }
    },
  });
});
