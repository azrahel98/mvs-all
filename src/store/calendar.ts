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
			this.$state.regis = await buscarRegistros(dni, mes, year)
			// this.$state.asistencia = await buscarAsistencia(dni, mes, year)
			this.$state.asistencia = []
		},
		addDayInfo(r: registro): boolean {
			if (this.asistencia.find((e) => e.fecha == r.fecha)) {
				if (r.falta == false && r.tardanza == 0) {
					this.asistencia = this.asistencia.filter((e) => e.fecha !== r.fecha)
					return false
				}
				this.asistencia.find((e) => e.fecha == r.fecha)!.falta = r.falta
				this.asistencia.find((e) => e.fecha == r.fecha)!.tardanza = r.tardanza
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
		// async guardarAsistencia(fecha: string, dni: string) {
		// 	// this.$state.asistencia.forEach(async (e) => {
		// 	// 	await asistenciaDD(e.dni.toString(), e.fecha.toString(), e.falta, e.tardanza)
		// 	// })
		// 	this.$state.saved = true
		// },
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
