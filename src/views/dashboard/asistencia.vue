<template>
	<div class="page-wrapper">
		<div class="page-body">
			<CardInfo
				:nombre="employ.nombre!"
				:area="employ.area!"
				:cargo="employ.cargo!"
				:dni="employ.dni!"
				:sexo="employ.sexo!"
			/>
			<div class="c-flex dia">
				<div class="main card col-lg-8 col-xl-7 col-xxl-4 col-md-10 col-sm-12">
					<div class="calendar-tools">
						<div class="d-flex align-items-center">
							<div class="align-content-center justify-content-center flechas">
								<button
									class="btn btn-link text-dark ripple-surface-dark btn-icon"
									style="min-width: 55.5px"
									@click="anterior"
								>
									<arrow-left-icon class="icon text-black" /></button
								><button
									data-mdb-ripple-color="dark"
									class="btn btn-link text-dark ripple-surface-dark btn-icon"
									@click="siguiente"
								>
									<arrow-right-icon class="icon text-black" />
								</button>
							</div>
							<span class="calendar-heading fs-3"
								>{{ getMonthName(dateInfo.mes) }} {{ dateInfo.year }}</span
							>
						</div>
						<div
							class="d-flex justify-content-center align-self-center align-items-center gap-2 action-us"
							v-if="ustore.level <= 2"
						>
							<button
								class="btn btn-md btn-pill btn-ghost-facebook"
								data-bs-toggle="modal"
								data-bs-target="#staticBackdrop"
							>
								<browser-plus-icon class="icon text-center align-self-center m-0" />
							</button>
							<button
								class="btn btn-md btn-pill btn-ghost-warning"
								v-if="calstore.saved"
								@click="upload"
							>
								<cloud-upload-icon class="icon text-center align-self-center m-0" />
							</button>
							<addCard />
						</div>
					</div>
					<div class="calendario">
						<div class="card xd">
							<div class="semana">
								<div class="card fs-4">L</div>
								<div class="card fs-4">M</div>
								<div class="card fs-4">M</div>
								<div class="card fs-4">J</div>
								<div class="card fs-4">V</div>
								<div class="card fs-4">S</div>
								<div class="card fs-4">D</div>
							</div>
							<div class="dias">
								<div
									class="card"
									v-for="_a in new Date(`${dateInfo.year}-${dateInfo.mes}-1`).getDay() ==
									0
										? 6
										: new Date(`${dateInfo.year}-${dateInfo.mes}-1`).getDay() - 1"
								/>

								<div
									v-for="x in moment([
										parseInt(router.currentRoute.value.params.year.toString()),
										parseInt(router.currentRoute.value.params.mes.toString()) - 1,
									])
										.endOf('month')
										.date()"
								>
									<CardDia
										:dia="x"
										:mes="parseInt(router.currentRoute.value.params.mes.toString())"
										:year="dateInfo.year"
										:dni="router.currentRoute.value.params.dni.toString()"
										:docs="calstore.regis.doc?.filter((e: any) => moment(e.fecha).date() == x)"
										:range="calstore.get_ranges(x)"
									/>
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
	import { BasicInfo } from '@models/trabajador'
	import { httpService } from '@utils/api'
	import { getMonthName } from '@utils/abrv'
	import { router } from '../../router'
	import { onMounted, ref, watch } from 'vue'
	import moment from 'moment'
	import CardInfo from '@components/Asistencia/trabajador.vue'
	import { calendarStore } from '@store/calendar'
	import { userStore } from '@store/user'
	import CardDia from '@components/Asistencia/dia.vue'
	import addCard from '@components/Asistencia/docs/add.vue'
	import { onBeforeRouteLeave } from 'vue-router'

	const dni = router.currentRoute.value.params as any
	const calstore = calendarStore()
	const ustore = userStore()

	const employ = ref<BasicInfo>({
		dni: '5465',
		sexo: '',
		nombre: '',
		area: '',
		cargo: '',
	})
	const dateInfo = ref<any>({
		mes: <number>parseInt(dni.mes),
		year: <number>parseInt(dni.year),
	})

	onMounted(async () => {
		try {
			calstore.isloading = true
			var infores = await httpService.get(`/employ/info/${dni.dni}`)
			employ.value = infores.data.result
			document.title = `${employ.value.nombre} - ${dni.mes}/${dni.year}`
			await calstore.agregar(dni.dni, parseInt(dni.mes), parseInt(dni.year))
			calstore.mes = parseInt(router.currentRoute.value.params.mes.toString())
			calstore.year = parseInt(router.currentRoute.value.params.year.toString())
			calstore.dni = router.currentRoute.value.params.dni.toString()
			calstore.isloading = false
		} catch (error) {
			console.log(error)
		}
	})

	watch(dateInfo.value, async (r, _x) => {
		try {
			calstore.isloading = true
			await calstore.agregar(dni.dni, r.mes, parseInt(r.year))
			await router.replace({
				params: { dni: dni.dni, mes: parseInt(r.mes), year: r.year },
			})
			calstore.mes = dateInfo.value.mes
			calstore.year = dateInfo.value.year
			calstore.isloading = false
		} catch (error) {
			console.log(error)
			calstore.isloading = false
		}
	})

	const siguiente = () => {
		if (calstore.saved) {
			let data = confirm('Estas seguro de salir sin guardar')
			if (data) {
				if (dateInfo.value.mes == 12) {
					dateInfo.value.mes = 1
					dateInfo.value.year = dateInfo.value.year + 1
				} else {
					dateInfo.value.mes = dateInfo.value.mes + 1
				}
			}
		} else {
			if (dateInfo.value.mes == 12) {
				dateInfo.value.mes = 1
				dateInfo.value.year = dateInfo.value.year + 1
			} else {
				dateInfo.value.mes = dateInfo.value.mes + 1
			}
		}
	}

	const anterior = () => {
		if (calstore.saved) {
			let data = confirm('Estas seguro de salir sin guardar')
			if (data) {
				if (dateInfo.value.mes == 1) {
					dateInfo.value.mes = 12
					dateInfo.value.year = dateInfo.value.year - 1
				} else {
					dateInfo.value.mes = dateInfo.value.mes - 1
				}
			}
		} else {
			if (dateInfo.value.mes == 1) {
				dateInfo.value.mes = 12
				dateInfo.value.year = dateInfo.value.year - 1
			} else {
				dateInfo.value.mes = dateInfo.value.mes - 1
			}
		}
	}
	onBeforeRouteLeave((_to, _from, next) => {
		if (calstore.saved) {
			const confirmacion = window.confirm(
				'¿Estás seguro de que quieres abandonar esta página?'
			)
			if (confirmacion) {
				next()
			} else {
				next(false)
			}
		}
		next()
	})

	const upload = async () => {
		try {
			await httpService.post('/asistencia/agregar', {
				dni: dni.dni,
				mes: parseInt(router.currentRoute.value.params.mes.toString()),
				year: parseInt(router.currentRoute.value.params.year.toString()),
				registros: calstore.getListUploat,
			})

			calstore.saved = false
		} catch (error) {
			console.log(error)
		}
	}
</script>

<style lang="scss" scoped>
	.imprimir {
		display: none;
	}
	.page-wrapper {
		.page-body {
			margin: 0;
			display: grid;
			width: 100%;
			row-gap: 0.9vh;
			grid-template-rows: auto;
			align-items: center;

			.main {
				align-self: center;
				justify-self: center;
				border-radius: 20px;
				padding: 1vh;
				display: grid;
				row-gap: 2vh;
				grid-template-rows: auto 1fr;

				.calendar-tools {
					border-radius: 10vh;
					width: 100%;
					display: flex;
					justify-content: space-between;
					gap: 2vh;
					div {
						padding-right: 1vh;
					}

					.calendar-heading {
						text-align: center;
						vertical-align: middle;
						font-weight: 700;
						text-transform: capitalize;
					}
				}

				.calendario {
					border-color: white !important;
					border: none;
					border-radius: 1vh;
					display: grid;
					justify-self: center;
					align-self: center;
					width: 100%;
					.xd {
						border-bottom: 0;
						border-left: 0;
						border-right: 0;
					}
					.card {
						.semana {
							display: grid;
							grid-template-columns: repeat(7, 1fr);
							column-gap: 0.1vh;
							.card {
								border-top: none;
								border-bottom: none;
								text-align: center;
								text-align: center;
								vertical-align: inherit;
							}
						}
						.dias {
							background-color: transparent;
							display: grid;
							grid-template-columns: repeat(7, 1fr);
							column-gap: 0.1vh;
						}
					}
				}
			}
		}
	}

	.c-flex {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		gap: 1vh;
		flex-wrap: wrap;
		.docs {
			padding: 0;
			margin: 0;
			width: max-content;
			background-color: transparent;
			height: min-content;
		}
	}

	@media print {
		.imprimir {
			display: block;
		}
		.main {
			width: 100%;
			.calendar-tools {
				justify-content: center !important;
				.flechas {
					display: none !important;
				}
				.calendar-heading {
					justify-content: center;
					align-items: center;
					justify-items: center;
				}
				.action-us {
					display: none !important;
				}
			}
			.calendario {
				width: 80%;
				.card {
					width: 100%;
					.semana {
						margin-bottom: 2vh;
					}
					.dias {
						column-gap: 0.8vh !important;
						row-gap: 1vh !important;
					}
				}
			}
		}
	}
</style>
