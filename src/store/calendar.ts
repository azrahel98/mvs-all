import { defineStore } from 'pinia'
import { Marcaciones } from '@models/asistencia'
import { buscarRegistros } from '@utils/go'

export interface registro {
	falta: boolean
	fecha: Date | string
	tardanza: number | null
	dni: string
}

export const calendarStore = defineStore('calendarStore', {
	state: () => ({
		regis: {
			registros: [],
			doc: [],
			ranges: [],
		} as unknown as Marcaciones,
		asistencia: [] as Array<registro>,
		saved: true as boolean,
	}),
	actions: {
		async agregar(dni: string, mes: number, year: number) {
			this.$state.regis = {
				registros: [],
				doc: [],
				ranges: [],
			} as unknown as Marcaciones
			this.$state.regis = await buscarRegistros(dni, mes, year)
			// this.$state.asistencia = await buscarAsistencia(dni, mes, year)
			this.$state.asistencia = []
		},
		borrar(ranged: boolean, id: number) {
			if (ranged) {
				const nuevo = this.$state.regis.ranges.filter((e: any) => e.id !== id)
				this.$state.regis = {
					registros: this.$state.regis.registros,
					doc: this.$state.regis.doc,
					ranges: nuevo,
				} as unknown as Marcaciones
			} else {
				const nuevo = this.$state.regis.doc.filter((e: any) => e.id !== id)
				this.$state.regis = {
					registros: this.$state.regis.registros,
					doc: nuevo,
					ranges: this.$state.regis.ranges,
				} as unknown as Marcaciones
			}
		},
	},
	getters: {
		getList(): Array<registro> {
			return this.asistencia.sort(
				(a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
			)
		},
		tardanza(): number {
			const suma = this.asistencia.reduce((a, b) => {
				if (b.tardanza == null) b.tardanza = 0
				return a + b.tardanza
			}, 0)
			return suma
		},
		faltas(): number {
			const suma = this.asistencia.reduce((a, b) => {
				if (b.falta) {
					return (a += 1)
				}
				return a
			}, 0)
			return suma
		},
	},
})
