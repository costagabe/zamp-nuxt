export const useLayoutStore = defineStore("layout", () => {
    const title = ref("");

    return {
        title,
    };
});
