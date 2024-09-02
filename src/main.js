import { createApp } from 'vue'
import '@/assets/scss/main.scss'
import piniaPersist from 'pinia-plugin-persistedstate'

import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.mount('#app')
