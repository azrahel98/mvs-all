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
								class="btn"
							>
								<check-icon class="icon" />
								Asistencia
							</RouterLink>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row g-3">
					<div class="col-lg-6 col-xxl-5 col-xl-6">
						<ul class="timeline">
							<li class="timeline-event" v-for="x in contratos">
								<div
									class="timeline-event-icon badge text-white"
									:class="x.activo == 'Y' ? 'bg-green text-white ' : 'bg-youtube-lt '"
								>
									{{ x.ingreso }}
								</div>
								<div class="card timeline-event-card">
									<div class="card-body">
										<h4>{{ x.cargo }}</h4>
										<div class="row">
											<div class="col-12 informacion">
												<div class="informacion text-secondary">
													<div class="list-inline-item-e">
														<building-community-icon
															class="icon icon-sm text-azure icon-filled"
														/>
														<span class="fs-5">{{ x.area }}</span>
													</div>
													<div class="list-inline-item-e">
														<clipboard-icon class="icon icon-sm text-azure icon-filled" />
														<span class="fs-5 text-uppercase">{{
															x.convocatoria_s
														}}</span>
													</div>
													<div class="list-inline-item-e">
														<table-options-icon
															class="icon icon-sm text-azure icon-filled"
														/>
														<span class="fs-5">{{ x.regimen }}</span>
													</div>
													<div class="list-inline-item-e">
														<door-exit-icon class="icon icon-sm text-azure icon-filled" />
														<span class="fs-5">{{ x.renuncia }}</span>
													</div>
													<div class="list-inline-item-e">
														<businessplan-icon
															class="icon icon-sm text-azure icon-filled"
														/>
														<span class="fs-5">{{ x.sueldo }}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="col-lg-6 col-xxl-4 col-xl-6">
						<div class="row row-cards">
							<div class="col-12">
								<div class="card">
									<div class="card-body">
										<div class="card-title">Conctacto</div>
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

	const user = ref<Trabajador_Info>()

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
			width: max-content;
		}
	}
</style>
