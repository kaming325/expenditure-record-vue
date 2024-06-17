<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="text-2xl font-bold">
      <div>Login</div>
    </div>
    <div>
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
        inputType="password"
        class="mb-4"
      ></IconInputField>
    </div>

    <div @click="login" role="button">
      <h2>Login</h2>
    </div>
    <!-- <div @click="debug" role="button">
      <h2>debug</h2>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import IconInputField from "@components/IconInputField.vue";

import catIcon from "@assets/icons/cat-svgrepo-com.svg?raw";
import lockIcon from "@assets/icons/lock-alt-svgrepo-com.svg?raw";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const router = useRouter();
const route = useRoute();

const loginInfo = reactive({
  email: "",
  phone: "",
  password: "",
});

const loading = ref(false);

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
      router.push("/");
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
}

function debug() {
  console.log(canLogin.value);

  // router.push("/");
}

// onBeforeMount(() => {
//   if (!!localStorage.getItem("userSession")) {
//     router.push("/");
//   }
// });
</script>
