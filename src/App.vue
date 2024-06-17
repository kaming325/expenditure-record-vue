<template>
  <div class="bg-layout h-full w-full min-h-[100vh] flex items-center">
    <div class="w-full flex justify-center items-center">
      <div class="bg-white rounded-lg p-10
      w-[70vh] h-[80vh]">
        <div>
          <nav v-if="hasLoggedIn">
            <RouterLink to="/">Go to Home</RouterLink>
            <RouterLink to="/about">Go to About</RouterLink>
            <RouterLink to="/user">Go to User</RouterLink>
            <RouterLink to="/login">Go to login</RouterLink>
          </nav>
          <main>
            <RouterView />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

// getter = computed() => {}
const hasLoggedIn = computed(() => {
  return !!(localStorage.getItem('userSession'));
})


onBeforeMount(() => {
  if (!hasLoggedIn.value) {
    router.push("login")
  }
})

</script>

<style scoped>
.bg-layout {
  background-image: url("@assets/img/comics-peanuts-snoopy-wallpaper-preview.jpg");
  background-size: 20%;
  opacity: 0.5;
}
</style>
