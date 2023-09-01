<template>
	<div
		class="modal fade"
		:id="`d-${(prop.doc as any).id}`"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body">
					<div class="card">
						<div class="ribbon ribbon-top bg-bitbucket-lt"></div>
						<div class="card-body">
							<h3 class="card-title" data-bs-dismiss="modal">
								{{ (prop.doc as any).asunto }} -{{ (prop.doc as any).nombre }}-{{
									(prop.doc as any).doc
								}}
							</h3>
							<p class="text-muted">
								{{ (prop.doc as any).descripcion }}
							</p>
							<p>{{ (prop.doc as any).referencia }}</p>
							<div v-if="(prop.doc as any).inicio" class="info">
								<div class="badge">
									{{ (prop.doc as any).inicio }}
								</div>
								<div class="badge">
									{{ (prop.doc as any).fin }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer d-flex justify-content-between">
					<button type="button" class="btn btn-sm" @click="eliminar">
						<trash-icon class="text-danger" />
					</button>
					<button
						type="button"
						class="btn btn-sm bg-warning-lt"
						data-bs-dismiss="modal"
						@click="anular"
					>
						<circle-dot-icon class="text-warning" />
					</button>
					<button type="button" class="btn btn-sm" data-bs-dismiss="modal">
						<x-icon class="text-danger" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { calendarStore } from '@store/calendar'
	import { httpService } from '@utils/api'
	import { useToast } from 'vue-toastification'

	const prop = defineProps({
		doc: { type: Object, required: true },
		id: { type: Number, required: true },
		ranged: { type: Boolean },
	})

	const toast = useToast()
	const calStore = calendarStore()

	const eliminar = async () => {
		try {
			var sure = confirm('Estas seguro ?')
			if (sure) {
				await httpService.post('/doc/delete', {
					id: prop.id,
				})
				calStore.borrar(prop.ranged, prop.id)
				toast.success('Eliminado')
			}
		} catch (error) {
			console.log('error')
		}
	}
	const anular = async () => {
		try {
			var sure = confirm('Estas seguro ?')
			if (sure) {
				await httpService.post('/doc/anulardoc', {
					id: prop.id,
					valor: false,
				})
				calStore.borrar(prop.ranged, prop.id)
				toast.warning('Actualizado')
			}
		} catch (error) {
			console.log('error')
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
