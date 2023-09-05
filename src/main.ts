import { createApp } from 'vue'
import { router } from './router'
import vueTabler from 'vue-tabler-icons'
import Toast from 'vue-toastification'
// @ts-ignore
import Vcalendar from 'v-calendar'
import ContextMenu from '@imengyu/vue3-context-menu'

import 'vue-toastification/dist/index.css'
import './style.css'
import './assets/tabler.css'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

import App from './App.vue'
import { createPinia } from 'pinia'
import vue3lottie from 'vue3-lottie'

const pinia = createPinia()

createApp(App)
	.use(router)
	.use(vueTabler)
	.use(ContextMenu)
	.use(Toast)
	.use(vue3lottie)
	.use(pinia)
	.use(Vcalendar)
	.mount('#app')
