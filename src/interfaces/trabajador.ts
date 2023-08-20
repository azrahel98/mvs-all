interface Trabajador_Info {
	cussp: string | undefined
	direccion: string | undefined
	discapacitado: string | undefined
	dni: string
	email: string | undefined
	fotosheck: string | undefined
	nacimiento: string | undefined
	nombre: string
	sexo: string
	telf: string | undefined
}

interface Contrato_Info {
	dni: string
	numero: string | undefined
	ingreso: string | undefined
	sueldo: number | undefined
	renuncia: string | undefined
	convocatoria: string | undefined
	convocatoria_s: string | undefined
	area: string
	cargo: string
	regimen: string
	f1: string | undefined
	f2: string | undefined
	f3: string | undefined
	f4: string | undefined
	f5: string | undefined
	f6: string | undefined
	f7: string | undefined
	f8: string | undefined
	f0: string | undefined
	f10: string | undefined
}

interface BasicInfo {
	dni: string
	sexo: string | undefined
	nombre: string
	area: string
	cargo: string
}

export { Trabajador_Info, Contrato_Info, BasicInfo }
