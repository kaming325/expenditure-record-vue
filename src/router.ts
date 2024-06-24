import {
  // createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import About from "@views/About.vue";
import Login from "@views/Login.vue";
import Home from "@views/Home.vue";
import User from "@views/User.vue";
import NewRecord from "@views/NewRecord.vue";
import Account from "@views/Account.vue";

const routes = [
  {
    path: "/",
    component: () => import("@layouts/AppLayout.vue"),
    children: [
      { path: "/", name: "fk", component: Home },
      { path: "/about", component: About },
      { path: "/user", component: User },
      { path: "/newRecord", component: NewRecord },
      { path: "/account", component: Account },
    ],
  },
  // { path: '/', component: Home },
  // { path: '/about', component: About },
  { path: "/login", component: Login },
  // { path: '/user', component: User },
  // { path: '/newRecord', component: NewRecord },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
