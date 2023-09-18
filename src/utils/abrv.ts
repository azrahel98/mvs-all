export function AbrevAsuntos(asunto: string) {
	switch (asunto) {
		case 'JUSTIFICADO':
			return {
				abr: 'JT',
				class: 'bg-azure',
				bg: 'bg-azure-lt',
			}
		case 'DF':
			return {
				abr: 'DF',
				class: 'bg-rss',
				bg: 'bg-rss-lt',
			}
		case 'ONOMASTICO':
			return {
				abr: 'ON',
				class: 'bg-green',
				bg: 'bg-green-lt',
			}
		case 'HORASEXTRAS':
			return {
				abr: 'HE',
				class: 'bg-green',
				bg: '',
			}
		case 'OMISION':
			return {
				abr: 'OM',
				class: 'bg-indigo',
				bg: '',
			}
		case 'LICENCIA':
			return {
				abr: 'LC',
				class: 'bg-vimeo',
				bg: 'bg-vimeo-lt',
			}
		case 'SANSION':
			return {
				abr: 'SC',
				class: 'bg-dribbble-lt',
				bg: '',
			}
		case 'DFXHEL':
			return {
				abr: 'XHE',
				class: 'bg-youtube',
				bg: '',
			}
		case 'AC':
			return {
				abr: 'AC',
				class: 'bg-dribbble-lt',
				bg: '',
			}
		case 'DM':
			return {
				abr: 'DM',
				class: 'bg-dribbble border-purple',
				bg: 'bg-dribbble',
			}
		default:
			return {
				abr: 'OT',
				class: 'bg-dribbble-lt',
				bg: '',
			}
	}
}

export function getMonthName(mes: number) {
	const monthNames = [
		'ENERO',
		'FEBRERO',
		'MARZO',
		'ABRIL',
		'MAYO',
		'JUNIO',
		'JULIO',
		'AGOSTO',
		'SEPTIEMBRE',
		'OCTUBRE',
		'NOVIEMBRE',
		'DICIEMBRE',
	]

	return monthNames[mes - 1]
}
