<template>
  <div
    v-on:keyup.enter="login"
    class="flex min-h-screen min-w-screen overflow-hidden bg-gray-200"
  >
    <div class="min-w-[40vw] max-w-[40vw] hidden sm:block">
      <img :src="snoopy" class="h-screen" />
    </div>
    <!-- top-[20vh] relative -->
    <div class="w-full flex justify-center">
      <div class="!p-4 flex flex-col gap-4 items-center justify-center">
        <div class="text-2xl font-bold">
          <div>Login</div>
        </div>
        <div class="w-max max-w-full">
          <IconInputField
            label="Email"
            :icon="catIcon"
            v-model:input-value="loginInfo.email"
            inputType="email"
            class="mb-4"
          ></IconInputField>

          <IconInputField
            label="Password"
            :icon="lockIcon"
            v-model:input-value="loginInfo.password"
            :inputType="showPassword ? 'text' : 'password'"
            class="mb-4"
          >
            <template #append-inner>
              <span @click="showPassword = !showPassword">
                <div
                  v-if="!showPassword"
                  ref="icon"
                  class="w-6 h-6"
                  v-html="passwordShow"
                ></div>
                <div
                  v-if="showPassword"
                  ref="icon"
                  class="w-6 h-6"
                  v-html="passwordHide"
                ></div>
              </span>
            </template>
          </IconInputField>
        </div>

        <div @click="login" role="button">
          <h2>Login</h2>
        </div>
        <div @click="debug" role="button">
          <h2>debug</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { loading, setUserSession } from "@/main";
import { onBeforeMount, reactive, ref } from "vue";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import IconInputField from "@components/IconInputField.vue";

import snoopy from "@assets/img/snoopy.jpg";

import catIcon from "@assets/icons/cat.svg?raw";
import lockIcon from "@assets/icons/lock.svg?raw";

import passwordShow from "@assets/icons/password-show.svg?raw";
import passwordHide from "@assets/icons/password-hide.svg?raw";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const router = useRouter();
const route = useRoute();

const loading = ref(false);

const showPassword = ref(false);

const loginInfo = reactive({
  email: "",
  phone: "",
  password: "",
});

const canLogin = computed(() => {
  return !!((loginInfo.email || loginInfo.phone) && loginInfo.password);
});

async function login() {
  if (loading.value) return;
  if (!canLogin.value) return;
  loading.value = true;
  try {
    const resp = await (
      await fetch(`${baseUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      })
    ).json();
    console.log(resp);
    if (resp.data?.session) {
      localStorage.setItem("userSession", JSON.stringify(resp.data.session));
      // setUserSession(resp.data.session)
      router.push("/");
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
}

document
  ?.querySelector("#txtSearch")
  ?.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // code for enter
    }
  });

function debug() {
  // loading.value = true

  console.log(canLogin.value);

  localStorage.setItem("userSession", JSON.stringify({ user: "hi2" }));

  // setUserSession({user: 'hi'})

  // loading.value = false

  // router.push("/user");
  router.push("/");
}

// onBeforeMount(() => {
//   if (!!localStorage.getItem("userSession")) {
//     router.push("/");
//   }
// });
</script>
