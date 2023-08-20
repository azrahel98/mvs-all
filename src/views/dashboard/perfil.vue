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
					</div>
					<div class="col-auto ms-auto">
						<div class="btn-list">
							<RouterLink
								:to="{
									name: 'asistencia',
									params: {
										dni: user?.dni,
										mes: 2,
										year: 2023,
									},
								}"
								tag="a"
								class="btn btn-primary"
							>
								<check-icon class="icon" />
								Asistencia
							</RouterLink>
							<!-- <a class="btn btn-primary">
								<check-icon class="icon" />
								Asistencia
							</a> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row g-3">
					<div class="col">
						<ul class="timeline">
							<li class="timeline-event" v-for="x in contratos">
								<div class="timeline-event-icon bg-twitter-lt">
									<file-export-icon class="icon" />
								</div>
								<div class="card timeline-event-card">
									<div class="card-body">
										<div class="text-secondary float-end">{{ x.ingreso }}</div>
										<h4>{{ x.cargo }}</h4>
										<div class="row">
											<div class="col-8">
												<div class="list-inline list-inline-dots text-secondary">
													<div class="list-inline-item">
														<info-circle-filled-icon class="icon icon-sm" />
														<span class="fs-5">{{ x.area }}</span>
													</div>
													<div class="list-inline-item">
														<info-circle-filled-icon class="icon icon-sm" />
														<span class="fs-5">{{ x.convocatoria_s }}</span>
													</div>
													<div class="list-inline-item">
														<info-circle-filled-icon class="icon icon-sm" />
														<span class="fs-5">{{ x.regimen }}</span>
													</div>
													<div class="list-inline-item">
														<info-circle-filled-icon class="icon icon-sm" />
														<span class="fs-5">{{ x.renuncia }}</span>
													</div>
													<div class="list-inline-item">
														<info-circle-filled-icon class="icon icon-sm" />
														<span class="fs-5">{{ x.sueldo }}</span>
													</div>
												</div>
											</div>
										</div>
										<!-- <div class="lista">
											<span>{{ x.area }}</span>
											<span>{{ x.convocatoria_s }}</span>
											<span>{{ x.regimen }}</span>
										</div> -->
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="col-lg-4">
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
