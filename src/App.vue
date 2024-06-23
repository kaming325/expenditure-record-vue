<template>
    <RouterView />
</template>

<script setup lang="ts">
// import { store, loading } from "@/main";
import { onBeforeMount, computed, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import Login from "./views/Login.vue";


import MenuIcon from "@assets/icons/menu.svg?raw";
import MenuIcon1 from "@assets/icons/menu2.svg?raw";
import CloseIcon from "@assets/icons/close.svg?raw";
import AddIcon from "@assets/icons/add.svg?raw";

const router = useRouter();
const route = useRoute();

const isOpen = ref(false);

const tabs = [
  {
    name: "Dashboard",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Account",
    to: "/user",
  },
  {
    name: "login",
    to: "/login",
  },
];

// getter = computed() => {}
const loggedinUser = computed(() => {
  // return store.userSession;
});

onBeforeMount(() => {
  // if (!loggedinUser?.value) {
  //   router.push("login");
  // }
});

// function logout() {
//   localStorage.removeItem
// }
</script>

<style scoped>
.bg-layout {
  background-image: url("@assets/img/comics-peanuts-snoopy-wallpaper-preview.jpg");
  background-size: 20%;
  opacity: 0.5;
}

/* @import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap'); */
.font-family-ubuntu {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.bg-sidebar {
  background: #3d68ff;
}
.cta-btn {
  color: #3d68ff;
}
.upgrade-btn {
  background: #1947ee;
}
.upgrade-btn:hover {
  background: #0038fd;
}
/* .active-nav-link {
  background: #1947ee;
} */
/* .nav-item:hover {
  background: #1947ee;
} */
.account-link:hover {
  background: #3d68ff;
}
</style>
