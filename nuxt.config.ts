export default defineNuxtConfig({
  ssr: false,
  vite: {
    server: {
      // host: "localhost.tokiomarine.com.br",
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          rewrite: (path) => path.replace(/\/api/, ""),
          changeOrigin: true,
        },
      },
    },
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxt/ui"],
  devtools: { enabled: true },
  components: {
    dirs: ["./ui/components"],
  },
  imports: {
    dirs: [
      "./ui/composables",
      "./ui/stores",
      "./server/connections",
      "./ui/util",
      "./ui/enum",
      "./ui/types",
      "./ui/validators",
      "./ui/services",
    ],
  },
  dir: {
    pages: "./ui/pages",
    assets: "./ui/assets",
    layouts: "./ui/layouts",
    plugins: "./ui/plugins",
    middleware: "./ui/middleware",
  },
});
