import { defineStore } from 'pinia'
import { Marcaciones } from '@models/asistencia'
import { buscarRegistros, buscar_asistencia } from '@utils/go'
import moment from 'moment'

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
		saved: false as boolean,
	}),
	actions: {
		async agregar(dni: string, mes: number, year: number) {
			this.$state.regis = {
				registros: [],
				doc: [],
				ranges: [],
			} as unknown as Marcaciones
			this.$state.regis = await buscarRegistros(dni, mes, year)
			this.$state.asistencia = await buscar_asistencia(dni, mes, year)
		},
		addDayInfo(r: registro): boolean {
			this.saved = true
			if (this.asistencia.find((e) => moment(e.fecha).date() == moment(r.fecha).date())) {
				if (!r.falta && r.tardanza == 0) {
					this.asistencia = this.asistencia.filter(
						(e) => moment(e.fecha).date() !== moment(r.fecha).date()
					)
					return false
				}
				this.asistencia.find(
					(e) => moment(e.fecha).date() == moment(r.fecha).date()
				)!.falta = r.falta
				this.asistencia.find(
					(e) => moment(e.fecha).date() == moment(r.fecha).date()
				)!.tardanza = r.tardanza
				return true
			} else {
				if (r.falta && r.tardanza != 0) {
					this.asistencia.push({
						falta: r.falta,
						fecha: r.fecha,
						tardanza: null,
						dni: r.dni,
					})
				} else if ((!r.falta && r.tardanza == null) || r.tardanza == 0) {
					return false
				} else {
					if (r.tardanza && r.tardanza > 0) {
						this.asistencia.push({
							falta: r.falta,
							fecha: r.fecha,
							tardanza: r.tardanza,
							dni: r.dni,
						})
						return true
					}
					return false
				}
			}
			return false
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
		get_registro: (state) => (dia: number) => {
			return state.asistencia.find((e) => moment(e.fecha).date() == dia)
		},
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
		getListUploat(): Array<registro> {
			var list: Array<registro> = []
			this.asistencia.forEach((e) => {
				e.falta = Boolean(e.falta)
				list.push(e)
			})

			return list
		},
	},
})
