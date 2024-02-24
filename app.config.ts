export default defineAppConfig({
  ui: {
    primary: "harvest-gold",
    gray: "sambuca",
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 bottom-auto",
    },
    table: {
      td: {
        padding: "py-1",
      },
      tr: {
        base: "hover:bg-sambuca-800",
      },
    },
  },
});
