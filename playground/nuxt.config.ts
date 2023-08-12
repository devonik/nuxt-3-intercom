export default defineNuxtConfig({
  modules: ["../src/module"],
  intercom: {
    appId: process.env.INTERCOM_APP_ID,
  },
});
