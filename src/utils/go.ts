import { Marcaciones } from '@models/asistencia'
import { httpService } from './api'
import { registro } from '@store/calendar'

export async function buscarRegistros(
	dni: string,
	mes: number,
	year: number
): Promise<Marcaciones> {
	try {
		const data = await httpService.post('/doc/', {
			dni,
			mes,
			year,
		})
		return data.data.documentos
	} catch (error) {
		console.log(error)
		throw error
	}
}

export async function buscar_asistencia(
	dni: string,
	mes: number,
	year: number
): Promise<Array<registro>> {
	try {
		const data = await httpService.post('/asistencia/', {
			dni,
			mes,
			year,
		})
		return data.data.asistencia
	} catch (error) {
		console.log(error)
		throw error
	}
}
