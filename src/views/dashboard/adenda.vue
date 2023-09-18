<template>
	<div class="page page-center">
		<div class="container container-tight py-4">
			<div class="card card-md">
				<div class="card-body">
					<h2 class="h2 text-center mb-4">Creacion Andas</h2>
					<form @submit.prevent="crea_anda" autocomplete="off">
						<div class="row row-cards">
							<div class="col-md-4">
								<div class="mb-3">
									<label class="form-label">DNI</label>
									<input
										type="text"
										class="form-control"
										placeholr="Company"
										maxlength="8"
										v-mol="datos.dni"
										no
									/>
								</div>
							</div>
							<div class="col-md-8">
								<div class="mb-3">
									<label class="form-label">Nombre</label>
									<input
										type="text"
										class="form-control"
										placeholr="Username"
										v-mol="datos.nombre"
										no
									/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<label class="form-label">Area</label>
									<input
										type="text"
										class="form-control"
										v-mol="datos.area"
										placeholr="Email"
										no
									/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="mb-3">
									<label class="form-label">Cargo</label>
									<input
										type="text"
										class="form-control"
										v-mol="datos.cargo"
										placeholr="Email"
										no
									/>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Ruc</label>
									<input
										type="text"
										class="form-control"
										v-mol="datos.ruc"
										maxlength="10"
										no
									/>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Contrato</label>
									<input type="text" class="form-control" v-mol="datos.contrato" no />
								</div>
							</div>
							<div class="col-md-12">
								<div class="mb-3">
									<label class="form-label">Direccion</label>
									<input
										type="text"
										class="form-control"
										v-mol="datos.direccion"
										placeholr="Av 1 Mz f Lt 2"
										no
									/>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Inicio</label>
									<input
										type="text"
										name="input-mask"
										class="form-control"
										v-mol="datos.info.inicio"
										data-mask="00/00/0000"
										data-mask-visible="true"
										placeholr="00/00/0000"
										autocomplete="off"
									/>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Final</label>
									<input
										type="text"
										name="input-mask"
										class="form-control"
										data-mask="00/00/0000"
										v-mol="datos.info.fin"
										data-mask-visible="true"
										placeholr="00/00/0000"
										autocomplete="off"
									/>
								</div>
							</div>
						</div>

						<div class="form-footer">
							<button type="button" @click="crea_anda" class="btn btn-primary w-100">
								Crear
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row text-center">
				<table class="table">
					<thead>
						<tr>
							<th>Anda</th>
							<th>Año</th>
							<th>Contrato</th>
							<th>Dni</th>
							<th>Ruc</th>
							<th>Nombre</th>
							<th>Direccion</th>
							<th>Area</th>
							<th>Cargo</th>
							<th>Inicio</th>
							<th>Fin</th>
							<th>Firma</th>
							<th>resolucion</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="x in all">
							<th>{{ x.info.anda }}</th>
							<td>{{ x.info.año }}</td>
							<td>{{ x.contrato as string }}</td>
							<td>{{ x.dni }}</td>
							<td>{{ x.ruc }}</td>
							<td>{{ x.nombre }}</td>
							<td>{{ x.direccion }}</td>
							<td>{{ x.area }}</td>
							<td>{{ x.cargo }}</td>
							<td>{{ x.info.inicio }}</td>
							<td>{{ x.info.fin }}</td>
							<td>{{ x.info.firma }}</td>
							<td>{{ x.info.resolucion }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue'
	import dayjs from 'dayjs'
	import { getMonthName } from '@utils/abrv'

	interface anda_mo {
		inicio: string
		fin: string
		firma: string | null
		resolucion: string | null
		anda: number | null
		año: number
	}

	interface anda_info {
		dni: string
		nombre: string
		area: string
		cargo: string
		ruc: string
		contrato: string
		direccion: string
		info: anda_mo
	}

	const datos = reactive<anda_info>({
		dni: '',
		nombre: '',
		area: '',
		cargo: '',
		ruc: '',
		contrato: '',
		direccion: '',
		info: {
			anda: null,
			fin: '2022-01-31',
			firma: null,
			inicio: '2022-01-01',
			resolucion: null,
			año: 2022,
		},
	})

	const all = ref<Array<anda_info>>([])

	var ahora = dayjs('2023-12-01')
	const anda = ref(1)

	const crea_anda = () => {
		try {
			all.value = []
			var inicioad = dayjs(datos.info.inicio)
			var finad = dayjs(datos.info.fin)
			var fecha = finad

			var contador = true
			while (fecha.isBefore(ahora) || fecha.isSame(ahora, 'month')) {
				var anda_String: anda_mo = {
					fin: '',
					firma: '',
					anda: anda.value,
					resolucion: '02-2023-ALC',
					inicio: '',
					año: 2022,
				}
				// resolucion

				if (fecha.isAfter(dayjs('2019-09-27')) && fecha.isBefore(dayjs('2022-06-27'))) {
					anda_String.resolucion = '262-2019-ALC-MVES'
				} else if (
					fecha.isAfter(dayjs('202-06-27')) &&
					fecha.isBefore(dayjs('2023-01-02'))
				) {
					anda_String.resolucion = '74-2022-ALC-MVES (e)'
				} else {
					anda_String.resolucion = '02-2023-ALC-MVES'
				}

				// inicio
				if (contador) {
					anda_String.inicio = `${inicioad.date()}  ${getMonthName(
						inicioad.month() + 1
					)} DEL ${inicioad.year()} HASTA EL ${fecha
						.endOf('month')
						.date()}  ${getMonthName(fecha.month() + 1)} DEL ${fecha.year()}`
					// firma
					anda_String.firma = ` ${fecha.endOf('month').date()}  ${getMonthName(
						fecha.month() + 1
					)} DEL ${fecha.year()}`
					anda_String.año = fecha.year()
				} else {
					var mesnext = fecha.add(1, 'month')

					if (mesnext.month() == 0) {
						anda_String.inicio = `01  ${getMonthName(
							12
						)} DEL ${mesnext.year()} HASTA EL ${fecha
							.endOf('month')
							.date()}  ${getMonthName(12)} DEL ${fecha.year()}`
						anda.value = 1
						anda_String.año = fecha.year() + 1
					} else {
						anda_String.inicio = `01  ${getMonthName(
							mesnext.month()
						)} DEL ${mesnext.year()} HASTA EL ${fecha
							.endOf('month')
							.date()}  ${getMonthName(fecha.month() + 1)} DEL ${fecha.year()}`
						anda_String.año = fecha.year()
					}

					// firma
					anda_String.firma = `${fecha.endOf('month').date()}  ${getMonthName(
						fecha.month() + 1
					)} DEL ${fecha.year()}`
				}

				// fin
				var mesnext = fecha.add(1, 'month')

				anda_String.fin = `01  ${getMonthName(
					mesnext.month() + 1
				)} DEL ${mesnext.year()} HASTA EL ${mesnext
					.endOf('month')
					.date()}  ${getMonthName(mesnext.month() + 1)} DEL ${mesnext.year()}`
				// fin  fin

				all.value.push({
					area: datos.area,
					cargo: datos.cargo,
					contrato: datos.contrato,
					direccion: datos.direccion,
					dni: datos.dni,
					nombre: datos.nombre,
					ruc: datos.ruc,
					info: {
						anda: anda.value,
						fin: anda_String.fin,
						inicio: anda_String.inicio,
						firma: anda_String.firma,
						resolucion: anda_String.resolucion,
						año: anda_String.año,
					},
				})

				fecha = fecha.add(1, 'month')
				contador = false
				anda.value += 1
			}
		} catch (error) {
			console.log(error)
		}
	}
</script>
