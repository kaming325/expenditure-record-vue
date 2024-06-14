<template>
  <div class="bg-layout h-full w-full min-h-[100vh] flex items-center">
    <div class="w-full flex justify-center items-center">
      <div class="bg-white rounded-lg w-[70vh] h-[80vh]">
        <nav>
          <RouterLink to="/">Go to Home</RouterLink>
          <RouterLink to="/about">Go to About</RouterLink>
        </nav>
        <main>
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bg-layout {
  background-image: url("@assets/img/comics-peanuts-snoopy-wallpaper-preview.jpg");
  opacity: 0.5;
}
</style>
