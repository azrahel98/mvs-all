import { decodeToken } from 'jsontokens'
import {
	NavigationGuardNext,
	RouteRecordRaw,
	createRouter,
	createWebHistory,
} from 'vue-router'

function decodeTokena(next: NavigationGuardNext) {
	try {
		const token = localStorage.getItem('token')
		if (token === null) {
			return next({ name: 'login' })
		}
		const tokendata = decodeToken(token).payload as any

		if (tokendata.exp < Date.now() / 1000) {
			localStorage.removeItem('token')
			return next({ name: 'login' })
		}
		return next()
	} catch (error) {
		return next({ name: 'login' })
	}
}

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('@views/login.vue'),
		name: 'login',
	},
	{
		path: '/',
		component: () => import('@views/dashbard.vue'),
		name: 'dashboard',
		beforeEnter: (_to, _from, next): void => {
			decodeTokena(next)
		},

		children: [
			{
				path: '/',
				component: () => import('@views/dashboard/main.vue'),
				name: 'main',
			},
			{
				name: 'perfil',
				path: '/trabajador/:dni',
				component: () => import('@views/dashboard/perfil.vue'),
			},
			{
				name: 'asistencia',
				path: '/asistencia/:dni/:mes/:year',
				component: () => import('@views/dashboard/asistencia.vue'),
			},
		],
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: 'active',
})
