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
		mes: 1,
		year: 2023,
		dni: '',
		regis: {
			registros: [],
			docs: [],
			ranges: [],
		} as unknown as Marcaciones,
		asistencia: [] as Array<registro>,
		isloading: false as boolean,
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
		addDayInfo(dia: number, tardanza: number | null, falta: boolean): boolean {
			this.saved = true
			if (this.get_day(dia)) {
				if ((!falta && tardanza == 0) || tardanza == null) {
					this.asistencia = this.asistencia.filter(
						(e) => parseInt(e.fecha.toString().split('-')[2]) !== dia
					)
					return false
				} else if ((falta && tardanza != null) || tardanza == 0) {
					this.asistencia.find(
						(e) => parseInt(e.fecha.toString().split('-')[2]) == dia
					)!.tardanza = null
				}
				this.asistencia.find(
					(e) => parseInt(e.fecha.toString().split('-')[2]) == dia
				)!.tardanza = tardanza
				return true
			} else {
				if (falta && (tardanza != 0 || tardanza == null)) {
					this.asistencia.push({
						dni: this.dni,
						falta: falta,
						fecha: `${this.year}-${this.mes}-${dia}`,
						tardanza: null,
					})
					return true
				} else if (!falta && tardanza == null) {
					return false
				} else {
					if (tardanza && tardanza > 0) {
						this.asistencia.push({
							dni: this.dni,
							falta: falta,
							fecha: `${this.year}-${this.mes}-${dia}`,
							tardanza: tardanza,
						})
						return true
					}
					return false
				}
			}
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
			return state.asistencia.find(
				(e) => moment(e.fecha, 'YYYY-MM-DD').date() == dia
			) as any
		},
		get_regis: (state) => (dia: number) => {
			return state.regis.registros.find(
				(e: any) => moment(e.fecha, 'YYYY-MM-DD').date() == dia
			)
		},
		get_docs: (state) => (dia: number) => {
			return state.regis.doc?.filter(
				(e: any) => moment(e.fecha, 'YYYY-MM-DD').date() == dia
			)
		},
		get_ranges: (state) => (dia: number) => {
			return state.regis?.ranges.filter((e: any) =>
				moment({
					year: state.year,
					month: state.mes,
					day: dia,
				}).isBetween(
					moment({
						year: parseInt(String(e.inicio).split('-')[0]),
						month: parseInt(String(e.inicio).split('-')[1]),
						day: parseInt(String(e.inicio).split('-')[2]),
					}),
					moment({
						year: parseInt(String(e.fin).split('-')[0]),
						month: parseInt(String(e.fin).split('-')[1]),
						day: parseInt(String(e.fin).split('-')[2]),
					}),
					null,
					'[]'
				)
			)
		},
		get_day: (state) => (dia: number) => {
			return state.asistencia.find(
				(e) => parseInt(e.fecha.toString().split('-')[2]) == dia
			)
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
