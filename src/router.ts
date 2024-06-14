import { createMemoryHistory, createRouter } from 'vue-router'

import About from '@components/About.vue'

const routes = [
//   { path: '/', component: HomeView },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router