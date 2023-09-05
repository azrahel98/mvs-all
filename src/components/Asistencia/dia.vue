<template>
	<div
		class="card"
		@contextmenu="showmenuconttext($event)"
		:class="[
			docs!.length > 0 && !registro ? `${AbrevAsuntos((docs![0] as any).asunto).bg}` : '',
			range!.length > 0 && docs ? `${AbrevAsuntos((range![0] as any).asunto).bg}`:'',
			 store.asistencia.find((x) => moment(x.fecha).date() == prop.dia )?.falta ? 'bg-danger bg-gradient':'',
			 store.asistencia.find((x) => moment(x.fecha).date() == prop.dia )?.tardanza ? 'bg-warning-lt bg-gradient':'',
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
		</div>
		<div class="docs" v-if="docs?.length != 0 || range?.length != 0">
			<div class="ranges" v-if="prop.range" v-for="r in prop.range">
				<div
					class="badge text-white"
					data-bs-toggle="modal"
					:class="AbrevAsuntos((r as any).asunto).class"
					:data-bs-target="`#d-${(r as any).id}`"
				>
					{{ AbrevAsuntos((r as any).asunto).abr }}
				</div>
				<ModalCal :doc="(r as Object)" :id="(r as any).id" :ranged="true" />
			</div>
			<div class="doc" v-if="prop.docs" v-for="r in prop.docs">
				<div
					class="badge text-white"
					:class="AbrevAsuntos((r as any).asunto).class"
					data-bs-toggle="modal"
					:data-bs-target="`#d-${(r as any).id}`"
				>
					{{ AbrevAsuntos((r as any).asunto).abr }}
				</div>
				<ModalCal :doc="(r as Object)" :id="(r as any).id" :ranged="false" />
			</div>
		</div>
		<div class="text-center fs-3 fw-bolder text-youtube">
			{{
				store.asistencia.find((x) => moment(x.fecha).date() == prop.dia)?.tardanza == 0
					? ''
					: store.asistencia.find((x) => moment(x.fecha).date() == prop.dia)?.tardanza
			}}
		</div>
		<div
			class="d-flex justify-content-center"
			v-if="!store.asistencia.find((x) => moment(x.fecha).date() == prop.dia)?.falta"
		>
			<div class="input-group text-center" v-if="ustore.level == 3">
				<input
					type="number"
					class="form-control"
					@change="changed"
					v-model="asitencia.tardanza"
					:class="[asitencia.saved ? 'is-valid' : '']"
				/>
			</div>
		</div>
		<context-menu
			v-model:show="showmenu"
			:options="(optionsComponent as MenuOptions)"
			v-if="ustore.level == 3"
		>
			<context-menu-item
				@click="agregar_falta"
				v-if="!store.asistencia.find((x) => moment(x.fecha).date() == prop.dia)?.falta"
			>
				<label class="label fs-5 fw-bold text-youtube">Falta </label>

				<user-edit-icon class="icon text-youtube" />
			</context-menu-item>
			<context-menu-item @click="quitar_falta" v-else>
				<label class="label fs-5 fw-bold text-twitter">Editar</label>
				<user-edit-icon class="icon text-twitter" />
			</context-menu-item>
			<context-menu-sperator />
		</context-menu>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue'
	import { AbrevAsuntos } from '@utils/abrv'
	import { router } from '../../router'
	import ModalCal from '@components/Asistencia/moda_info.vue'
	import { ContextMenu, ContextMenuItem, MenuOptions } from '@imengyu/vue3-context-menu'
	import { calendarStore } from '@store/calendar'
	import moment from 'moment'
	import { userStore } from '@store/user'

	const prop = defineProps({
		dia: { type: Number, required: true },
		registro: { type: Object },
		docs: { type: Array },
		range: { type: Array },
	})

	const store = calendarStore()
	const ustore = userStore()

	const optionsComponent = ref({
		zIndex: 1,
		x: 500,
		y: 200,
	} as MenuOptions)

	const showmenu = ref(false)

	const showmenuconttext = (e: MouseEvent) => {
		e.preventDefault()
		optionsComponent.value.x = e.x
		optionsComponent.value.y = e.y
		showmenu.value = true
	}

	const params = router.currentRoute.value.params as any

	const asitencia = reactive<any>({
		falta: 0,
		fecha: `${params.year}-${params.mes}-${prop.dia}`,
		tardanza: null,
		dni: params.dni,
	})

	const changed = (_e: any) => {
		console.log(asitencia)
		store.addDayInfo(asitencia)
		return
	}

	const agregar_falta = () => {
		asitencia.falta = true
		asitencia.tardanza = null
		store.addDayInfo(asitencia)
	}
	const quitar_falta = () => {
		asitencia.falta = false
		asitencia.tardanza = null
		store.addDayInfo(asitencia)
	}
</script>
<style lang="scss">
	.mx-context-menu {
		display: flex;
		flex-direction: column;
		width: min-content;
		padding: 0;
		margin: 0;
		.mx-context-menu-items {
			width: min-content;
			flex-direction: column;
			gap: 5vh;
		}
	}
	.mx-context-menu-scroll {
		display: none;
	}
</style>
<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	.input-group {
		padding: 0;
		margin: 0;

		width: 6vh;
		input {
			padding: 0;
			margin: 0;
			width: 1vh !important;
			text-align: center;
			font-size: 0.7rem;
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
