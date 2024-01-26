export default defineNuxtConfig({
    ssr: false,
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
    devtools: { enabled: true },
    components: {
        dirs: ["./ui/components"],
    },
    imports: {
        dirs: ["./ui/composables", "./ui/stores", "./server/connections", "./ui/utils"],
    },
    dir: {
        pages: "./ui/pages",
        assets: "./ui/assets",
        layouts: "./ui/layouts",
        plugins: "./ui/plugins",
    },
});
