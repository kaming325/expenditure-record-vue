import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

export const loading = reactive({
    value: false
})

export const store = reactive({
    userSession: null
})

export function setUserSession(user: any) {
    store.userSession = user
}

export function removeUserSession() {
    store.userSession = null
}

createApp(App).use(router).mount('#app')
// export default {
//     store,
//     setUserSession,
//     removeUserSession
// }
