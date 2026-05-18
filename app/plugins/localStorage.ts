export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    // Server-side: provide mock localStorage
    global.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      get length() { return 0 },
      key: () => null
    } as Storage
  }
})
