import { createMemoryHistory, createRouter } from 'vue-router'

import About from '@views/About.vue'
import Login from "@views/Login.vue"
import Home from "@views/Home.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router