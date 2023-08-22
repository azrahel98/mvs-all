import { Marcaciones } from '@models/asistencia'
import { httpService } from './api'

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
		console.log(data.data.documentos)
		return data.data.documentos
	} catch (error) {
		console.log(error)
		throw error
	}
}
