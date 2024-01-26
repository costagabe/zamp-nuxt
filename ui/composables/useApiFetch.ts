// import type { UseFetchOptions } from "nuxt/dist/app/composables";
// import { defu } from "defu";
// export function useApiFetch<T>(endpoint: string, options: UseFetchOptions<T> = {}) {
//   const authStore = useAuthStore();
//   const defaults: UseFetchOptions<T> = {
//     baseURL: "http://localhost:8080",
//     // this overrides the default key generation, which includes a hash of
//     // url, method, headers, etc. - this should be used with care as the key
//     // is how Nuxt decides how responses should be deduplicated between
//     // client and server
//     key: endpoint,
//
//     // set user token if connected
//     headers: authStore.authenticated && authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {},
//
//     onResponse(_ctx) {
//       // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
//     },
//
//     onResponseError(ctx) {
//       if (ctx.response.status === 401) {
//         authStore.authenticated = false;
//         authStore.token = null;
//       }
//     },
//   };
//
//   // for nice deep defaults, please use unjs/defu
//   const params = defu(options, defaults);
//   return useFetch(endpoint, params);
//
//   // const baseUrl = "http://localhost:8080";
//   // const headers = options?.headers || ({} as any);
//
//   // if (authStore.authenticated && authStore.token) {
//   //     headers["Authorization"] = `Bearer ${authStore.token}`;
//   // }
//   // return useFetch(`${baseUrl}${endpoint}`, {
//   //     ...options,
//   //     headers,
//
//   // });
// }
