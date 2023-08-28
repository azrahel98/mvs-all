<template>
	<div
		class="modal fade"
		id="staticBackdrop"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<form class="modal-body" autocomplete="off">
					<fieldset class="form-fieldset d-flex gap-1">
						<div class="mb-1">
							<label class="form-label required">N° Documento</label>
							<input type="text" class="form-control" v-model="doc.nombre" required />
						</div>
						<div class="mb-1">
							<label class="form-label required">Fecha</label>
							<input type="date" class="form-control" v-model="doc.fecha" />
						</div>
						<div class="mb-1">
							<label class="form-label">Tipo Doc</label>
							<select
								class="form-select tomselected ts-hidden-accessible"
								v-model="doc.tipo"
							>
								<option value="1">DOC-ADM</option>
								<option value="2">MEMORANDO</option>
								<option value="3">SOLICITUD</option>
								<option value="4">DESCANSO MEDICO</option>
								<option value="5">INFORME</option>
								<option value="6">RESOLUCION</option>
								<option value="7">CARTA</option>
								<option selected value="8">PAPELETA</option>
								<option value="9">RENUNCIA</option>
							</select>
						</div>
					</fieldset>
					<div class="cuerpo mt-2">
						<div class="card card-stacked">
							<div class="card-body">
								<div
									class="d-flex gap-2 align-items-center justify-content-center flex-wrap"
								>
									<div class="input-group-sm text-center">
										<select
											class="form-select tomselected ts-hidden-accessible"
											v-model="det.asunto"
										>
											<option selected value="DF">DF</option>
											<option value="HORASEXTRAS">HORASEXTRAS</option>
											<option value="ONOMASTICO">ONOMASTICO</option>
											<option value="JUSTIFICADO">JUSTIFICADO</option>
											<option value="OMISION">OMISION</option>
											<option value="LICENCIA">LICENCIA</option>
											<option value="SANCION">SANCION</option>
											<option value="DFXHEL">DFXHEL</option>
											<option value="AC">AC</option>
											<option value="DM">DM</option>
											<option value="OTROS">OTROS</option>
										</select>
									</div>

									<div class="input-group-sm">
										<input type="text" class="form-control" v-model="det.referencia" />
									</div>
								</div>
								<div class="input-group mt-2">
									<span class="input-group-text">
										<input
											class="form-check-input m-0"
											type="checkbox"
											v-model="isrange"
										/>
									</span>
									<input
										type="date"
										v-model="det.fecha"
										class="form-control"
										:disabled="isrange ? true : false"
									/>
								</div>
								<div class="input-group gap-2">
									<v-date-picker
										mode="date"
										class="mt-2"
										:is-range="true"
										:class="isrange ? '' : 'd-none'"
										v-model="valrange"
									/>
									<textarea
										class="mt-2 form-control"
										v-model="det.descripcion"
									></textarea>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div>
					<ul>
						<li v-for="x in detalle">{{ x }}</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-sm" data-bs-dismiss="modal">
						<x-icon class="text-danger" />
					</button>
					<button class="btn btn-sm" type="button" @click="add">
						<plus-icon class="text-primary" />
					</button>
					<button class="btn btn-sm" @click="guardar">
						<device-mobile-search-icon class="text-primary" />
					</button>
					<button class="btn btn-sm" @click="buscar">
						<search-icon class="text-success" />
					</button>
					<button class="btn btn-sm">
						<trash-x-icon class="text-danger" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import moment from 'moment'
	import { router } from '../../../router'
	import 'v-calendar/style.css'
	import { reactive, ref } from 'vue'
	import { httpService } from '@utils/api'
	import { useToast } from 'vue-toastification'

	const isrange = ref(false)
	const valrange = ref()

	const toast = useToast()

	const det = reactive({
		dni: (router.currentRoute.value.params as any).dni,
		fecha: moment().format('YYYY-MM-DD').toString(),
		descripcion: '',
		asunto: 'JUSTIFICADO',
		referencia: '',
		inicio: '',
		fin: '',
	})

	const doc = reactive({
		nombre: '',
		tipo: 1,
		fecha: moment().format('YYYY-MM-DD').toString(),
		code: 0,
	})

	const detalle = ref<Array<Object>>([])

	const add = () => {
		if (isrange.value) {
			det.fecha = 'NULL'
			det.inicio = moment(valrange.value.start).format('YYYY-MM-DD').toString()
			det.fin = moment(valrange.value.end).format('YYYY-MM-DD').toString()
		} else {
			det.inicio = 'NULL'
			det.fin = 'NULL'
		}

		detalle.value.push({
			dni: det.dni,
			fecha: det.fecha,
			descripcion: det.descripcion,
			asunto: det.asunto,
			referencia: det.referencia,
			inicio: det.inicio,
			fin: det.fin,
		})
		det.dni = (router.currentRoute.value.params as any).dni
		det.fecha = moment().format('YYYY-MM-DD').toString()
		det.descripcion = ''
		det.asunto = 'JUSTIFICADO'
		det.referencia = ''
		det.inicio = ''
		det.fin = ''
	}

	const buscar = async () => {
		try {
			const docsx = await httpService.post('/doc/search', {
				doc: doc.nombre,
			})
			doc.tipo = docsx.data.documento.tipo
			doc.fecha = docsx.data.documento.fecha
			doc.code = docsx.data.documento.docid
		} catch (error) {}
	}

	const guardar = async () => {
		try {
			const docres = await httpService.post('/doc/addoc', {
				fecha: doc.fecha,
				nombre: doc.nombre,
				tipo: parseInt(doc.tipo.toString()),
			})
			doc.code = docres.data

			detalle.value.forEach(async (d: any) => {
				await httpService.post('/doc/addetalle', {
					dni: d.dni,
					doc: doc.code,
					fecha: d.fecha == 'NULL' ? null : d.fecha,
					descripcion: d.descripcion,
					asunto: d.asunto,
					referencia: d.referencia.trim() == '' ? null : d.referencia,
					inicio: d.inicio == 'NULL' ? null : d.inicio,
					fin: d.fin == 'NULL' ? null : d.fin,
				})
			})

			toast.success(`se ah guardado ${doc.code}`)
		} catch (error) {
			toast.error(error as any)
			console.log(error)
		}
	}
</script>

<style lang="scss" scoped>
	.mgrid {
		display: grid;
		grid-template-areas:
			'info tools'
			'body body';
		background-color: var(--tblr-body-bg);
		column-gap: 1vh;
		padding: 0 1vh 0.5vh 0.5vh;
		fieldset {
			padding: 0;
			padding: 1vh 0 1vh;
			margin: 0;
			grid-area: info;
			border: none;
			width: 100%;
		}
		.cuerpo {
			grid-area: body;
		}
	}
</style>
