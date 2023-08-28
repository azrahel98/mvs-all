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
			<div class="c-flex">
				<div class="main card col-lg-6 col-xl-6 col-xxl-6 col-md-8 col-sm-12">
					<div class="calendar-tools">
						<div class="d-flex flex-column flex-lg-row">
							<div class="d-flex align-content-center justify-content-center">
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
							<span class="calendar-heading"
								>{{ getMonthName(dateInfo.mes) }} {{ dateInfo.year }}</span
							>
						</div>
						<div class="d-flex justify-content-between bt gap-4">
							<button
								class="btn btn-ghost-info btn-icon w-100"
								data-bs-toggle="modal"
								data-bs-target="#staticBackdrop"
							>
								<browser-plus-icon />
							</button>
							<addCard />
						</div>
					</div>
					<div class="calendario">
						<div class="card xd">
							<div class="semana">
								<div class="card">L</div>
								<div class="card">M</div>
								<div class="card">M</div>
								<div class="card">J</div>
								<div class="card">V</div>
								<div class="card">S</div>
								<div class="card">D</div>
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
									v-for="x in moment(
										`${dateInfo.year}-${dateInfo.mes}-01`,
										'yyyy-mm-dd'
									).daysInMonth()"
								>
									<CardDia
										:class="[isLoading ? 'loading-skeleton' : '']"
										:dia="x"
										:registro="calstore.regis.registros.find((e:any) => moment(e.fecha).date() == x)"
										:docs="calstore.regis.doc.filter((e:any) => moment(e.fecha).date() == x )"
										:range="calstore.regis?.ranges.filter((e:any) => moment(`${dateInfo.year}-${dateInfo.mes}-${x}`).isBetween(moment(e.inicio),moment(e.fin),null,'[]') )"
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
	import { onMounted, onUnmounted, ref, watch } from 'vue'
	import moment from 'moment'
	import CardInfo from '@components/Asistencia/trabajador.vue'
	import { calendarStore } from '@store/calendar'
	import CardDia from '@components/Asistencia/dia.vue'
	import addCard from '@components/Asistencia/docs/add.vue'

	const isLoading = ref(false)
	const dni = router.currentRoute.value.params as any
	const calstore = calendarStore()

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
			isLoading.value = true
			var infores = await httpService.get(`/employ/info/${dni.dni}`)
			employ.value = infores.data.result
			calstore.agregar(dni.dni, parseInt(dni.mes), parseInt(dni.year))
			isLoading.value = false
		} catch (error) {
			console.log(error)
		}
	})

	onUnmounted(() => {
		calstore.$reset()
	})

	watch(dateInfo.value, async (r, _x) => {
		try {
			isLoading.value = true
			calstore.agregar(dni.dni, r.mes, parseInt(r.year))
			await router.replace({
				params: { dni: dni.dni, mes: parseInt(r.mes), year: r.year },
			})
			isLoading.value = false
		} catch (error) {
			console.log(error)
			isLoading.value = false
		}
	})

	const siguiente = () => {
		if (!calstore.saved) {
			let data = confirm('Estas seguro de salir sin guardar')
			if (data) {
				calstore.$reset()
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
		if (!calstore.saved) {
			let data = confirm('Estas seguro de salir sin guardar')
			if (data) {
				calstore.$reset()
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
</script>

<style lang="scss" scoped>
	.page-wrapper {
		.page-body {
			margin: 0;
			display: grid;
			width: 100%;
			row-gap: 0.9vh;
			grid-template-rows: auto;
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
					flex-wrap: wrap;
					justify-content: space-between;
					gap: 2vh;
					div {
						padding-right: 1vh;
					}

					.calendar-heading {
						font-size: 1.8rem;
						font-weight: 700;
						text-transform: capitalize;
					}
				}

				.calendario {
					background-color: white !important;
					border-color: white !important;
					border: none;
					border-radius: 1vh;
					display: grid;

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
								font-weight: bold;
								font-size: 0.85rem;
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

	.loading-skeleton {
		background-color: red;
		animation: loading 1s infinite alternate;
	}

	@keyframes loading {
		0% {
			background-color: #ddd;
		}
		100% {
			background-color: white;
		}
	}
</style>
