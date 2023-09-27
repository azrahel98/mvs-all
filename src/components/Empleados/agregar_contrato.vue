<template>
	<div
		class="modal modal-blur fade"
		id="modal-addcontrato"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<form class="card" @submit.prevent="">
					<div class="card-body">
						<h3 class="card-title">Agregar Contrato</h3>
						<div class="row row-cards">
							<div class="col-md-4">
								<div class="mb-3">
									<label class="form-label">Contrato</label>
									<input
										type="text"
										class="form-control"
										placeholder="15-2023"
										v-model="contrato.contrato"
										required
									/>
								</div>
							</div>
							<div class="col-sm-6 col-md-4">
								<div class="mb-3">
									<label class="form-label">Ingreso</label>
									<input
										type="date"
										class="form-control"
										placeholder="Username"
										v-model="contrato.inicio"
										required
									/>
								</div>
							</div>
							<div class="col-sm-6 col-md-4">
								<div class="mb-3">
									<label class="form-label">Convocatoria</label>
									<input
										type="text"
										class="form-control"
										placeholder="24-2023"
										v-model="contrato.convocatoria"
									/>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Area</label>
									<div class="input-group mb-2">
										<input
											type="text"
											class="form-control fs-5"
											v-model="area_val"
											placeholder="Areas"
											required
										/>
										<button
											v-if="area_val.length > 3"
											class="btn btn-icon"
											type="button"
											data-bs-toggle="modal"
											data-bs-target="#modal-small"
											@click="search_area_all"
										>
											<zoom-code-icon class="icon icon-sm" />
										</button>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Cargo</label>
									<div class="input-group mb-2">
										<input
											type="text"
											class="form-control fs-5"
											v-model="cargo_val"
											placeholder="Cargo"
										/>
										<button
											v-if="cargo_val.length > 3"
											class="btn btn-icon"
											type="button"
											data-bs-toggle="modal"
											data-bs-target="#modal-small"
											@click="search_cargo_all"
										>
											<zoom-code-icon class="icon icon-sm" />
										</button>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Regimen</label>
									<select class="form-select" v-model="contrato.regimen">
										<option selected value="1">CAS D.L 1057</option>
										<option value="3">CAS D.U 034-2021</option>
										<option value="2">CAS D.U 083-2021</option>
										<option value="5">D.L 728</option>
										<option value="7">D.L 276</option>
										<option value="6">D.L 276 - PER</option>
										<option value="8">D.L 276 - OBR</option>
										<option value="9">CAS FUNCIONARIO</option>
										<option value="10">SERVIR</option>
									</select>
								</div>
							</div>
							<div class="col-sm-6 col-md-6">
								<div class="mb-3">
									<label class="form-label">Sueldo</label>
									<div class="input-icon mb-3">
										<input
											type="number"
											class="form-control"
											required
											v-model="contrato.sueldo"
											placeholder="Search…"
										/>
										<span class="input-icon-addon">
											<businessplan-icon />
										</span>
									</div>
								</div>
							</div>
							<div class="col-12">
								<div class="mb-3">
									<label class="form-label">Funciones</label>
									<input
										type="text"
										class="form-control"
										@keyup.enter="agregar_funcion"
										v-model="funcion"
										placeholder="Funciones"
									/>
								</div>
								<div class="table-responsive">
									<table class="table">
										<thead>
											<tr>
												<th scope="col" class="col-2">#</th>
												<th scope="col" class="col-8 text-center">Funcion</th>
												<th scope="col" class="col-2">#</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(x, i) in funcion_array">
												<th scope="row" class="fs-6">{{ i + 1 }}</th>
												<td class="text-center fs-6">{{ x }}</td>
												<td>
													<button class="btn btn-sm btn-icon btn-action">
														<x-icon
															class="icon icon-sm text-danger"
															@click="borrar_funcion(i)"
														/>
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div class="card-footer d-flex justify-content-end gap-2">
						<button type="button" class="btn btn-icon" data-bs-dismiss="modal">
							<x-icon class="icon" />
						</button>
						<button
							type="button"
							class="btn btn-icon"
							@click="guardar_informacion"
							data-bs-dismiss="modal"
						>
							<world-upload-icon class="icon" />
						</button>
					</div>
				</form>
			</div>
		</div>
		<div
			class="modal fade bg-opacity-50 bg-black"
			id="modal-small"
			tabindex="-1"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Nombre</th>
									<th scope="col">***</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="x in area_cargo">
									<th scope="row" class="fs-6">{{ (x as any).id }}</th>
									<td class="fs-6">{{ (x as any).nombre }}</td>
									<td
										v-if="!search_cargo"
										@click="select_cargo((x as any).nombre, (x as any).id)"
										class="cursor-pointer"
									>
										<check-icon class="badge text-success" />
									</td>
									<td
										v-else
										@click="select_area((x as any).nombre, (x as any).id)"
										class="cursor-pointer"
									>
										<check-icon class="badge text-success" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.table-responsive {
		max-height: 20vh;
		overflow-y: auto;
	}
</style>

<script lang="ts" setup>
	import { httpService } from '@utils/api'
	import { router } from '../../router'
	import { reactive, ref } from 'vue'

	interface ContratoI {
		contrato: string
		inicio: string
		convocatoria: string
		area: number
		cargo: number
		regimen: number
		sueldo: number
		funciones: Array<string>[]
	}

	const emit = defineEmits()
	//

	const contrato = reactive<ContratoI>({
		area: 0,
		contrato: '',
		inicio: '',
		convocatoria: '',
		cargo: 0,
		regimen: 0,
		sueldo: 0,
		funciones: [],
	})

	//
	const search_cargo = ref(true)
	const cargo_val = ref('')
	const area_val = ref('')
	const area_cargo = ref([])

	//

	const funcion = ref('')
	const funcion_array = ref<Array<String>>([])

	const agregar_funcion = () => {
		funcion_array.value.push(funcion.value)
		funcion.value = ''
	}

	//

	const select_cargo = (cargo: string, id: number) => {
		cargo_val.value = cargo
		contrato.cargo = id
	}

	const search_cargo_all = async () => {
		search_cargo.value = true
		area_cargo.value = []
		try {
			if (search_cargo.value) {
				const result = await httpService.post('/employ/cargo', {
					nombre: cargo_val.value,
				})
				area_cargo.value = result.data.cargos
				search_cargo.value = false
			}
		} catch (error) {
			console.log('errors')
		}
	}

	const select_area = (area: string, id: number) => {
		area_val.value = area
		contrato.area = id
	}
	const search_area_all = async () => {
		try {
			search_cargo.value = false
			area_cargo.value = []
			if (search_cargo.value == false) {
				const result = await httpService.post('/employ/area', { nombre: area_val.value })
				area_cargo.value = result.data.areas
				search_cargo.value = true
			}
		} catch (error) {
			console.log('errors')
		}
	}

	//

	const borrar_funcion = (x: number) => {
		funcion_array.value.splice(x, 1)
	}

	//

	const guardar_informacion = async () => {
		try {
			await httpService.post('/employ/addcontrato', {
				dni: router.currentRoute.value.params.dni,
				contrato: contrato.contrato,
				ingreso: contrato.inicio,
				area: contrato.area,
				cargo: contrato.cargo,
				regimen: parseInt(contrato.regimen.toString()),
				sueldo: contrato.sueldo,
				funciones: contrato.funciones,
			})
			emit('success', true)
		} catch (error) {
			console.log(error)
		}
	}
</script>
