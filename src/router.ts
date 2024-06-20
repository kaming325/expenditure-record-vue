import { createMemoryHistory, createRouter } from 'vue-router'

import About from '@views/About.vue'
import Login from "@views/Login.vue"
import Home from "@views/Home.vue"
import User from "@views/User.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  // { path: '/login', component: Login },
  { path: '/user', component: User },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router