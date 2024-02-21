export const useAppStore = defineStore("app", () => {
    const loading = ref(false);

    return {
        loading,
    };
});
