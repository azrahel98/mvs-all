<template>
	<div
		class="card"
		:class="[
			docs!.length > 0 && !registro ? `${AbrevAsuntos((docs![0] as any).asunto).bg}` : '',
			range!.length > 0 && docs ? `${AbrevAsuntos((range![0] as any).asunto).bg}`:'',
			// store.asistencia.find((x) => moment(x.fecha).date() == prop.dia )?.falta ? 'bg-danger bg-gradient':'',
			// store.asistencia.find((x) => moment(x.fecha).date() == prop.dia )?.tardanza ? 'bg-warning-lt bg-gradient':'',
			registro ? '' : 'bg-warning-lt',
		]"
	>
		<h2 class="text-dark">{{ prop.dia }}</h2>
		<div class="horas" v-if="prop.registro">
			<div>
				<span class="status-dot bg-azure d-block text-center" />
				<p>{{ ((prop.registro as any).entrada as string).substring(0, 5) }}</p>
			</div>
			<div v-if="(prop.registro as any).entrada2">
				<span class="status-dot bg-azure d-block text-center" />
				<p>
					{{ ((prop.registro as any).entrada2 as string).substring(0, 5) }}
				</p>
			</div>
			<div v-if="(prop.registro as any).salida">
				<span class="status-dot bg-azure d-block text-center" />
				<p>
					{{ ((prop.registro as any).salida as string).substring(0, 5) }}
				</p>
			</div>
			<!-- <div class="tardanza" v-if="((prop.registro as any).tardanza) ">
				<span
					class="status-dot status-dot-animated bg-warning d-block text-center"
				/>
				<p>
					{{ ((prop.registro as any).tardanza as string).substring(0, 5) }}
				</p>
			</div> -->
		</div>
		<div class="docs" v-if="docs?.length != 0 || range?.length != 0">
			<div class="ranges" v-if="prop.range" v-for="r in prop.range">
				<div
					class="badge"
					data-bs-toggle="modal"
					:class="AbrevAsuntos((r as any).asunto).class"
					:data-bs-target="`#d-${(r as any).det}`"
				>
					{{ AbrevAsuntos((r as any).asunto).abr }}
				</div>
			</div>
			<div class="doc" v-if="prop.docs" v-for="r in prop.docs">
				<div
					class="badge opacity-70"
					:class="AbrevAsuntos((r as any).asunto).class"
					data-bs-toggle="modal"
					:data-bs-target="`#d-${(r as any).det}`"
				>
					{{ AbrevAsuntos((r as any).asunto).abr }}
				</div>
			</div>
		</div>
		<div>
			<div class="input-group">
				<div class="input-group-text">
					<input
						class="form-check-input mt-0"
						type="checkbox"
						v-model="asitencia.falta"
						aria-label="Checkbox for following text input"
					/>
				</div>
				<input
					type="number"
					class="form-control"
					@change="changed"
					v-model="asitencia.tardanza"
					:class="[asitencia.saved ? 'is-valid' : '']"
					@keyup.enter="save"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { reactive } from 'vue'
	import { AbrevAsuntos } from '@utils/abrv'
	import { router } from '../../router'

	import { calendarStore } from '@store/calendar'

	const prop = defineProps({
		dia: { type: Number, required: true },
		registro: { type: Object },
		docs: { type: Array },
		range: { type: Array },
	})

	const store = calendarStore()

	const params = router.currentRoute.value.params as any

	const asitencia = reactive<any>({
		falta: false,
		fecha: `${params.year}-${params.mes}-${prop.dia}`,
		tardanza: null,
		dni: params.dni,
	})

	const changed = (_e: any) => {
		if (asitencia.falta) {
			asitencia.tardanza = null
			return
		}
	}

	const save = () => {
		asitencia.saved = store.addDayInfo(asitencia)
		store.saved = false
	}
</script>
<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	.input-group {
		padding: 0;
		margin: 0;
		height: min-content;
		input {
			padding: 0;
			margin: 0;
		}
		.input-group-text {
			padding: 0.2rem;
			margin: 0;
			.form-check-input {
				height: 100%;
			}
		}
	}
	.card {
		font-family: 'Montserrat', sans-serif;
		min-height: 80px;
		display: grid;
		grid-template-rows: min-content min-content min-content auto;
		padding: 0;
		margin: 0;
		font-weight: 500;
		row-gap: 0.8vh;
		font-size: 0.75rem;
		h2,
		p {
			margin: 0;
			padding: 0;
			justify-self: center;
			height: auto;
		}
		.horas,
		.docs {
			height: min-content;
		}
		.horas {
			justify-self: center;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			gap: 1vh;
			div {
				display: flex;
				align-items: center;
			}
		}
		.docs {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
		}
	}
</style>
