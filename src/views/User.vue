<template>
  <div>
    <h2>User</h2>
    <div>
      {{ userSession }}
    </div>
    <div @click="signOut" role="button">sign out</div>
  </div>
</template>

<script setup lang="ts">
import { loading, removeUserSession } from "@/main";

const userSession = JSON.parse(localStorage.getItem("userSession") ?? "{}");

async function signOut() {
  loading.value = true;

  await Promise.resolve(
    setTimeout(() => {
      loading.value = false;
    }, 1000)
  );
  removeUserSession();
}
</script>
