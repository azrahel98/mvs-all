<template>
	<div class="page-wrapper">
		<div class="page-header">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-auto">
						<img
							class="avatar avatar-lg rounded"
							v-if="user?.sexo == 'F'"
							src="../../assets/sexo/f.png"
						/>
						<img class="avatar avatar-lg rounded" src="../../assets/sexo/m.png" v-else />
					</div>
					<div class="col-8">
						<h1 class="fw-bold">{{ user?.nombre }}</h1>
						<span>{{ user?.dni }}</span>
					</div>
					<div class="col-auto ms-auto">
						<div class="btn-list">
							<RouterLink
								:to="{
									name: 'asistencia',
									params: {
										dni: user?.dni,
										mes: `${new Date().getMonth() + 1}`,
										year: 2023,
									},
								}"
								tag="a"
								class="btn btn-icon"
							>
								<calendar-event-icon class="icon" />
							</RouterLink>

							<button
								v-if="ustore.level == 1"
								class="btn btn-icon"
								data-bs-toggle="modal"
								data-bs-target="#modal-addcontrato"
							>
								<plus-icon />
							</button>
							<agregarcontrato v-if="ustore.level == 1" @success="listen" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row d-flex justify-content-around g-3">
					<div class="col-lg-6 col-xxl-5 col-xl-6">
						<ul class="timeline">
							<li class="timeline-event" v-for="x in contratos">
								<div
									class="timeline-event-icon badge fs-5"
									:class="
										x.activo == 'Y'
											? 'bg-green text-white '
											: 'bg-youtube-lt text-danger fw-bolder '
									"
								>
									{{ x.ingreso }}
								</div>
								<div class="card timeline-event-card">
									<div class="card-body">
										<div class="row">
											<h4 class="col-md-10">{{ x.cargo }}</h4>
											<div
												class="col-2 text-end"
												v-if="ustore.level == 1 && x.activo == 'Y'"
											>
												<button
													class="btn btn-md btn-icon text-youtube"
													data-bs-toggle="modal"
													data-bs-target="#modal-renuncia"
													@click="change(x.id)"
												>
													<logout-icon class="icon icon-sm" />
												</button>
											</div>
										</div>
										<div class="row">
											<div class="col-12 informacion">
												<div class="informacion text-secondary">
													<div class="list-inline-item-e">
														<span class="badge">
															Area
															<building-community-icon
																class="icon icon-sm text-azure icon-filled"
															/>
														</span>
														<span class="fs-5">{{ x.area }}</span>
													</div>
													<div class="list-inline-item-e">
														<span class="badge">
															Conv
															<clipboard-icon
																class="icon icon-sm text-azure icon-filled"
															/>
														</span>
														<span class="fs-5 text-uppercase">{{
															x.convocatoria_s
														}}</span>
													</div>
													<div class="list-inline-item-e">
														<span class="badge">
															Reg
															<table-options-icon
																class="icon icon-sm text-azure icon-filled"
															/>
														</span>
														<span class="fs-5">{{ x.regimen }}</span>
													</div>
													<div class="list-inline-item-e">
														<span class="badge">
															Contrato
															<table-options-icon
																class="icon icon-sm text-azure icon-filled"
														/></span>
														<span class="fs-5">{{ x.numero }}</span>
													</div>
													<div class="list-inline-item-e">
														<span class="badge">
															Renuncia
															<door-exit-icon
																class="icon icon-sm text-azure icon-filled"
															/>
														</span>
														<span class="fs-5">{{ x.renuncia }}</span>
													</div>
													<div class="list-inline-item-e">
														<span class="badge">
															Sueldo
															<businessplan-icon
																class="icon icon-sm text-azure icon-filled"
															/>
														</span>
														<span class="fs-5">{{ x.sueldo }}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
							<renuncia :id="idcontrato" @success="listen" />
						</ul>
					</div>
					<div class="col-lg-6 col-xxl-3 col-xl-6">
						<div class="row row-cards">
							<div class="col-12">
								<div class="card">
									<div class="card-body">
										<div class="card-title">Contacto</div>
										<div class="mb-2">
											<map-icon class="icon me-2 text-secondary" />
											{{ user?.direccion }}
										</div>
										<div class="mb-2">
											<mail-icon class="icon me-2 text-secondary" />
											<a class="text-reset">{{ user?.email }}</a>
										</div>
										<div class="mb-2">
											<cake-icon class="icon me-2 text-secondary" />
											{{ user?.nacimiento }}
										</div>
										<div class="mb-2">
											<id-icon class="icon me-2 text-secondary" />
											{{ user?.dni }}
										</div>
										<div class="mb-2">
											<gender-bigender-icon class="icon me-2 text-secondary" />
											{{ user?.sexo }}
										</div>
										<div class="mb-2">
											<disabled-icon class="icon me-2 text-secondary" />
											{{ user?.discapacitado == undefined ? 'NO' : 'SI' }}
										</div>
										<div class="mb-2">
											<id-badge-2-icon class="icon me-2 text-secondary" />
											{{ user?.fotosheck == undefined ? 'NO' : 'SI' }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { httpService } from '@utils/api'
	import { router } from '../../router'
	import { onMounted, ref } from 'vue'
	import { Contrato_Info, Trabajador_Info } from '@models/trabajador'
	import agregarcontrato from '@components/Empleados/agregar_contrato.vue'
	import renuncia from '@components/Empleados/renuncia.vue'
	import { userStore } from '@store/user'

	const user = ref<Trabajador_Info>()

	const ustore = userStore()

	const contratos = ref<Array<Contrato_Info>>([])

	onMounted(async () => {
		try {
			var resp = await httpService.get(`/employ/${router.currentRoute.value.params.dni}`)
			user.value = resp.data.result

			var cont = await httpService.get(
				`/employ/contrato/${router.currentRoute.value.params.dni}`
			)
			contratos.value = cont.data.contratos
		} catch (error) {
			console.log(error)
		}
	})

	const idcontrato = ref(0)

	const change = (id: number) => {
		console.log(id)
		idcontrato.value = id
	}

	const listen = async (x: boolean) => {
		if (x) {
			var cont = await httpService.get(
				`/employ/contrato/${router.currentRoute.value.params.dni}`
			)
			contratos.value = cont.data.contratos
		}
	}
</script>
<style lang="scss" scoped>
	.timeline-event-icon {
		width: min-content;
		font-weight: 600;
		height: min-content;
	}

	.informacion {
		.list-inline-item-e {
			display: flex;
			gap: 0.5vh;
			padding: 0;
			margin: 0;
			width: 100%;
			justify-content: unsafe;
			gap: 1vh;

			span {
				width: max-content;
				text-wrap: wrap;
			}
		}
	}
</style>
