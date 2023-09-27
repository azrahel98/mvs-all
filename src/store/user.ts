import { defineStore } from 'pinia'
import { decodeToken } from 'jsontokens'

export const userStore = defineStore('userStore', {
	state: () => ({
		user: 0,
		level: 0,
		nombre: '',
	}),
	actions: {
		async agregar() {
			const token = localStorage.getItem('token')
			const tokendata = decodeToken(token!).payload as any

			this.user = parseInt(tokendata.sub)
			this.level = parseInt(tokendata.lvl)
			this.nombre = tokendata.nombre
		},
	},
	getters: {
		nombre_pref(): string {
			switch (this.level) {
				case 1:
					return 'Administrador'
				case 2:
					return 'Asistencia'
				case 3:
					return 'Visitante'

				default:
					return 'Desconocido'
			}
		},
	},
})
