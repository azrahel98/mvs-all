export interface Marcaciones {
	registros: [
		{
			dni: string
			entrada: string
			entrada2: string
			salida: string
			fecha: string
		}
	]
	ranges: [
		{
			dni: string
			doc: number
			det: number
			inicio: string
			fin: string
			asunto: string
			descripcion: string
			referencia: string
		}
	]
	doc: [
		{
			dni: string
			doc: number
			det: number
			fecha: string
			asunto: string
			descripcion: string
			referencia: string
		}
	]
}
