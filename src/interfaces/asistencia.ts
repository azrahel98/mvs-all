export interface Marcaciones {
	registros: [
		{
			dni: string
			entrada: string
			salida: string
			tardanza: string
			date: string
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
