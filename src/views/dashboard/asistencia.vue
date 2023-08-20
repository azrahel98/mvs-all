<template>
	<div id="calendario">
		<div class="container-xl">
			<div class="page-body">
				<CardInfo
					v-if="employ"
					:nombre="employ.nombre"
					:area="employ.area"
					:cargo="employ.cargo"
					:dni="employ.dni"
				/>
				<div class="card main col-lg-8 col-md-8 col-sm-12">
					<div class="calendar-tools">
						<div class="d-flex flex-column flex-lg-row text-center">
							<div class="my-2 me-2 my-lg-0 d-flex justify-content-center">
								<button
									class="btn btn-link text-dark ripple-surface-dark"
									style="min-width: 55.5px"
									@click="anterior"
								>
									<arrow-left-icon /></button
								><button
									data-mdb-ripple-color="dark"
									class="btn btn-link text-dark ripple-surface-dark"
									@click="siguiente"
								>
									<arrow-right-icon />
								</button>
							</div>
							<span class="calendar-heading"
								>{{ getMonthName(dateInfo.mes) }} {{ dateInfo.year }}</span
							>
						</div>
						<div class="d-flex justify-content-between bt gap-4">
							<button
								class="btn btn-pill bg-primary-lt"
								data-bs-toggle="modal"
								data-bs-target="#staticBackdropD"
							>
								Añadir
							</button>
							<button
								class="btn btn-pill"
								:class="[calstore.saved ? 'bg-primary-lt' : 'bg-danger text-white']"
							>
								Reloj
							</button>
						</div>
					</div>
					<div class="calendario">
						<div class="card">
							<div class="semana">
								<div class="card">L</div>
								<div class="card">M</div>
								<div class="card">M</div>
								<div class="card">J</div>
								<div class="card">V</div>
								<div class="card">S</div>
								<div class="card">D</div>
							</div>
							<div class="dias" v-if="!isLoading">
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
										'YYYY-MM-DD'
									).daysInMonth()"
								>
									<CardDia
										:dia="x"
										:registro="calstore.regis?.registros.find((e:any) => moment(e.date).date() == x)"
										:docs="calstore.regis?.doc.filter((e:any) => moment(e.fecha).date() == x )"
										:range="calstore.regis?.ranges.filter((e:any) => moment(`${dateInfo.year}-${dateInfo.mes}-${x}`).isBetween(moment(e.inicio),moment(e.fin),null,'[]') )"
									/>
								</div>
							</div>
							<Loading v-else></Loading>
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
	import Loading from '@components/loading.vue'
	import CardDia from '@components/Asistencia/dia.vue'

	const isLoading = ref(false)
	const dni = router.currentRoute.value.params as any
	const calstore = calendarStore()

	const employ = ref<BasicInfo>()
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
	.page-body {
		display: grid;
		grid-template-rows: min-content auto;
		.row {
			padding: 0;
			margin: 0;
			gap: 1vh;
			justify-content: center;
			flex-wrap: wrap;
		}
		.main {
			border-radius: 20px;
			padding: 2vh;
			display: grid;
			grid-template-rows: auto 1fr;
			row-gap: 5vh;
			.calendar-tools {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				gap: 2vh;
				div {
					margin: auto;
				}

				.calendar-heading {
					font-size: 1.4rem;
					font-weight: 600;
					text-align: center;
				}
			}

			.calendario {
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
						display: grid;
						grid-template-columns: repeat(7, 1fr);
						column-gap: 0.1vh;
					}
				}
			}
		}
	}
	.registros {
		padding: 0;
		margin: 0;

		height: min-content;
		max-height: 80vh;
		text-align: center;

		table {
			tr {
				height: min-content;

				padding: 0;
				margin: 0;
				td {
					height: min-content;
					font-size: 0.9rem;
				}
			}
		}
	}
</style>
