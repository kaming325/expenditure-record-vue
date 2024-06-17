<template>
  <div>
    <h2>User</h2>
    <div @click="signOut">sign out</div>
  </div>
</template>

<script setup lang="ts">
async function signOut() {
  if (!!localStorage.getItem("userSession")) {
    localStorage.removeItem("userSession")
  }
}
</script>
