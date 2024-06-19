<template>
  <div>
    <h2>User</h2>
    <div>
      {{ userSession }}
    </div>
    <div @click="signOut">sign out</div>
  </div>
</template>

<script setup lang="ts">

const userSession = JSON.parse(localStorage.getItem("userSession") ?? "{}");

async function signOut() {
  if (!!localStorage.getItem("userSession")) {
    localStorage.removeItem("userSession")
  }
}
</script>
