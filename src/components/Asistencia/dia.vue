<template>
	<div
		class="card"
		@contextmenu="showmenuconttext"
		:class="[
			store.get_registro(dia)?.falta ? 'bg-danger bg-gradient' : '',
			store.get_registro(dia)?.tardanza ? 'bg-warning-lt bg-gradient' : '',
			store.isloading ? 'skeleton-loader' : '',
		]"
	>
		<h2 class="text-dark fs-3">{{ prop.dia }}</h2>
		<div class="horas" v-if="!store.isloading && store.get_regis(prop.dia)">
			<div>
				<span class="status-dot bg-azure d-block text-center" />
				<p>{{ store.get_regis(prop.dia)?.entrada.substring(0, 5) }}</p>
			</div>
			<div v-if="store.get_regis(prop.dia)?.entrada2">
				<span class="status-dot bg-azure d-block text-center" />
				<p>
					{{ (store.get_regis(prop.dia) as any).entrada2.substring(0, 5) }}
				</p>
			</div>
			<div v-if="store.get_regis(prop.dia)?.salida">
				<span class="status-dot bg-azure d-block text-center" />
				<p>
					{{ (store.get_regis(prop.dia) as any).salida.substring(0, 5) }}
				</p>
			</div>
		</div>
		<div class="docs">
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
		<div class="text-center fs-3 fw-bolder text-youtube tardanza">
			{{
				store.get_registro(dia)?.tardanza == 0 ? '' : store.get_registro(dia)?.tardanza
			}}
		</div>
		<div
			class="d-flex justify-content-center pb-1"
			v-if="!store.get_registro(dia)?.falta"
		>
			<div class="input-group text-center" v-if="ustore.level <= 2">
				<input
					type="number"
					class="form-control"
					tabindex="1"
					@change="changed"
					v-model="asitencia.tardanza"
					:class="[asitencia.saved ? 'is-valid' : '']"
				/>
			</div>
		</div>
		<context-menu
			v-model:show="showmenu"
			:options="(optionsComponent as MenuOptions)"
			v-if="ustore.level <= 2"
		>
			<context-menu-item
				@click="agregar_falta"
				v-if="!store.asistencia.find((x) => moment(x.fecha).date() == prop.dia)?.falta"
			>
				<label class="label fs-5 fw-bolder text-youtube">FALTA </label>

				<user-edit-icon class="icon icon-pulse text-youtube" />
			</context-menu-item>
			<context-menu-item @click="quitar_falta" v-else>
				<label class="label fs-5 fw-bold text-twitter">EDITAR</label>
				<user-edit-icon class="icon icon-pulse text-twitter" />
			</context-menu-item>
		</context-menu>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue'
	import { AbrevAsuntos } from '@utils/abrv'
	import moment from 'moment'
	import ModalCal from '@components/Asistencia/moda_info.vue'
	import { calendarStore } from '@store/calendar'
	import { userStore } from '@store/user'
	import { MenuOptions } from '@imengyu/vue3-context-menu'

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

	const asitencia = reactive<any>({
		falta: 0,
		fecha: `${store.year}-${store.mes}-${prop.dia}`,
		tardanza: null,
		dni: store.dni,
	})

	const changed = (_e: any) => {
		// store.addDayInfo(asitencia, prop.dia)
		store.addDayInfo(prop.dia, asitencia.tardanza, asitencia.falta)
		asitencia.falta = false
		asitencia.tardanza = null
		return
	}

	const agregar_falta = () => {
		asitencia.falta = true
		asitencia.tardanza = null
		// store.addDayInfo(asitencia, prop.dia)
		store.addDayInfo(prop.dia, asitencia.tardanza, asitencia.falta)
	}
	const quitar_falta = () => {
		asitencia.falta = false
		asitencia.tardanza = null
		store.addDayInfo(prop.dia, asitencia.tardanza, asitencia.falta)
		// store.addDayInfo(asitencia, prop.dia)
	}
</script>
<style lang="scss">
	.mx-context-menu {
		display: flex;
		flex-direction: column;
		width: min-content;
		padding: 0;
		margin: 0;
		background-color: var(--tblr-info-lt);
		.mx-context-menu-items {
			padding: 0;
			margin: 0;
			width: 100%;
			flex-direction: column;
			gap: 0vh;
			:hover {
				background-color: var(--tblr-danger-lt);
				border-radius: 10px 10px 0px 0px;
			}
		}
	}
	.mx-context-menu-scroll {
		display: none;
	}
</style>
<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	.skeleton-loader {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		input {
			display: none;
		}
		.status-dot {
			display: none;
		}
	}

	/* Estilo para el fondo pulsante */
	.skeleton-loader::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f6f8fb;
		background-size: 200% 100%;
		animation: loading 1.5s infinite;
	}
	@keyframes loading {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
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
			height: 2.2vh;
		}
	}
	.card {
		font-family: 'Montserrat', sans-serif;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		margin: 0;
		font-weight: 500;
		row-gap: 0.1vh;
		font-size: 0.75rem;
		height: 100%;
		min-height: 65px;
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

	@media print {
		.card {
			border: 2px dashed #6e7072;
			background-color: white;
			input {
				display: none;
			}
			.tardanza {
				font-size: 1.5rem !important;
				color: red;
			}
		}
	}
</style>
