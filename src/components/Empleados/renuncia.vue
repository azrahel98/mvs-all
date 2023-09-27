<template>
	<div
		class="modal modal-blur fade"
		id="modal-renuncia"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{{ prop.id }}</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<div>
						<label class="form-label">Agrega la Renuncia</label>
						<input type="date" class="form-control" v-model="renuncia" />
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn me-auto btn-icon" data-bs-dismiss="modal">
						<x-icon class="icon" />
					</button>
					<button
						type="button"
						@click="subir"
						class="btn btn-icon"
						data-bs-dismiss="modal"
					>
						<bookmark-edit-icon class="icon icon-filled text-danger icon-md" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { httpService } from '@utils/api'
	import { router } from '../../router'
	import dayjs from 'dayjs'
	import { ref } from 'vue'

	const prop = defineProps({
		id: { type: Number, required: true },
	})
	const emit = defineEmits()
	const renuncia = ref('2023-01-01')

	const subir = async () => {
		try {
			if (dayjs(renuncia.value).isValid()) {
				await httpService.post('/employ/addrenuncia', {
					id: prop.id,
					renuncia: renuncia.value,
				})
				emit('success', true)
			}
		} catch (error) {
			console.log(error)
			router.go(0)
		}
	}
</script>
