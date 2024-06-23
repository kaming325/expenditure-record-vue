import { createApp, reactive } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import StyleClass from "primevue/styleclass";

import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara";
import Nora from "@primevue/themes/nora";
import AutoComplete from "primevue/autocomplete";
import ToastService from "primevue/toastservice";

import 'primeicons/primeicons.css'


// import "primevue/resources/themes/md-light-indigo/theme.css";

createApp(App)
  .use(router)
  .use(PrimeVue, {
    ripple: true,
    theme: {
      preset: Lara,
      options: {
        // prefix: "p",
        darkModeSelector: ".app-dark",
        // cssLayer: {
        //   name: "primevue",
        //   order: "tailwind-base, primevue, tailwind-utilities",
        // },
      },
    },
  })
  .use(ToastService)
  // .directive("styleclass", StyleClass)
  .component("AutoComplete", AutoComplete)
  .mount("#app");
