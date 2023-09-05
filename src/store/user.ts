import { defineStore } from 'pinia'
import { decodeToken } from 'jsontokens'

export const userStore = defineStore('userStore', {
	state: () => ({
		user: 0,
		level: 0,
	}),
	actions: {
		async agregar() {
			const token = localStorage.getItem('token')
			const tokendata = decodeToken(token!).payload as any

			this.user = parseInt(tokendata.sub)
			this.level = parseInt(tokendata.lvl)
		},
	},
})
