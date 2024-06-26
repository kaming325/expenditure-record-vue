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

import "primeicons/primeicons.css";
import { userSessionType } from "./types";

export async function validateToken() {
  const userSession: userSessionType = JSON.parse(
    localStorage.getItem("userSession") ?? "{}"
  );

  if (!userSession?.access_token) {
    return false;
  }

  if (new Date() < new Date(userSession?.expires_at * 1000) ) {
    return userSession?.access_token;
  }

  // const baseUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    // const resp = await (
    //   await fetch(`${baseUrl}/auth`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       refresh_token: userSession.refresh_token,
    //     }),
    //   })
    // ).json();
    const resp = await sendRequest(
      "auth",
      "POST",
      {
        "Content-Type": "application/json",
      },
      {
        refresh_token: userSession.refresh_token,
      }
    );
    console.log(resp);
    if (resp.data?.session) {
      localStorage.setItem("userSession", JSON.stringify(resp.data.session));
      // setUserSession(resp.data.session)
      return resp.data?.session?.access_token;
    }
    return false;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

export async function sendRequest<T>(
  path: string,
  method: "POST" | "GET" | "DELETE",
  headers: any,
  requestBody: T
) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  try {
    const resp = await (
      await fetch(`${baseUrl}/${path}`, {
        // api/account
        method,
        headers,
        body: method === 'GET' ? undefined : JSON.stringify(requestBody),
      })
    ).json();
    return resp;
  } catch (error) {
    console.warn(error);
    // TODO: maybe add retry logic?
  }
}

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
