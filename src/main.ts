import { createApp } from 'vue'
import { router } from './router'
import vueTabler from 'vue-tabler-icons'
import Toast from 'vue-toastification'
// @ts-ignore
import Vcalendar from 'v-calendar'

import 'vue-toastification/dist/index.css'
import './style.css'
import './assets/tabler.css'

import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
	.use(router)
	.use(vueTabler)
	.use(Toast)
	.use(pinia)
	.use(Vcalendar)
	.mount('#app')
