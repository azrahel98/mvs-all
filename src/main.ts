import { createApp } from 'vue'
import { router } from './router'
import vueTabler from 'vue-tabler-icons'

import './style.css'
import './assets/tabler.css'

import App from './App.vue'

createApp(App).use(router).use(vueTabler).mount('#app')
