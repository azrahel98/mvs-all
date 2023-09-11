<template>
	<div class="page-wrapper">
		<div class="page-header d-print-none">
			<div class="container-xl">
				<div class="row g-2 align-items-center">
					<div class="col">
						<h2 class="page-title">Trabajadores</h2>
						<div class="text-secondary mt-1" v-if="Trabajadores.length > 0">
							{{ Trabajadores.length }} encontrados
						</div>
					</div>
					<div class="col-auto ms-auto d-print-none">
						<div class="d-flex">
							<input
								type="search"
								class="form-control d-inline-block w-9 me-3"
								placeholder="Pepito Perez"
								v-model="nombre"
								@keyup.enter="buscar"
							/>
							<!-- <a class="btn btn-primary">
								<plus-icon class="icon" />
								Trabajador
							</a> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards align-content-center justify-content-center">
					<card
						v-if="loading"
						v-for="x in Trabajadores"
						:dni="(x as any).dni"
						:name="(x as any).nombre"
						:activo="x.activos"
						:sexo="x.sexo"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import card from '@components/Empleados/card.vue'
	import { httpService } from '@utils/api'
	import { ref } from 'vue'
	import { TYPE, useToast } from 'vue-toastification'

	const toast = useToast()

	const nombre = ref('')
	const loading = ref(false)
	const Trabajadores = ref([] as Array<any>)

	async function buscar() {
		try {
			loading.value = false
			if (nombre.value.trim().length == 0) throw (new Error().message = 'campo vacio')
			const res = await httpService.post('/employ/search', {
				nombre: nombre.value,
			})
			Trabajadores.value = res.data.trabajadores
			if (Trabajadores.value.length == 0)
				throw (new Error().message = 'no hay trabajadores')
			loading.value = true
		} catch (error) {
			toast(String(error), {
				bodyClassName: 'alert p-0 m-0 text-white',
				icon: false,
				type: TYPE.INFO,
			})
		}
	}
</script>

<style lang="scss">
	.lottie {
		height: 50vh;
	}

	// .Vue-Toastification__container {
	// 	.Vue-Toastification__toast {
	// 		padding: 0;
	// 		margin: 0;
	// 		padding-left: 1vh;
	// 		padding-right: 1vh;
	// 		// background-color: var(--tblr-info);
	// 		svg {
	// 			width: 0;
	// 			margin: 0;
	// 			padding: 0;
	// 			display: none;
	// 		}
	// 		.Vue-Toastification__toast-body {
	// 			margin: 0;
	// 			display: flex;
	// 			justify-content: center;
	// 			align-items: center;
	// 			align-content: center;
	// 			font-weight: 500;
	// 			font-size: 0.8em;
	// 			background-color: transparent;
	// 			box-shadow: none;
	// 			border: none;
	// 		}
	// 	}
	// }
</style>
