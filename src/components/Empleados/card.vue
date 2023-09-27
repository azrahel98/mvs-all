<template>
	<div class="col-md-4 col-lg-3 col-xl-3 col-xxl-3 col-sm-6">
		<div class="card">
			<div class="card-body text-center">
				<img
					src="../../assets/sexo/f.png"
					class="avatar avatar-xl rounded"
					v-if="sexo === 'F'"
				/>
				<img src="../../assets/sexo/m.png" class="avatar avatar-xl rounded" v-else />
				<span class="page-subtitle text-black fw-bold">
					<RouterLink
						:to="{
							name: 'perfil',
							params: {
								dni: dni,
							},
						}"
					>
						{{ name }}
					</RouterLink>
				</span>
				<div class="text-secondary">{{ prop.dni }}</div>
				<span class="badge bg-green text-white" v-if="activo">Activo</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.card {
		margin: 0;
		padding: 0;
		.card-body {
			padding: 0;
			padding-top: 0.5vh;
			padding-bottom: 0.5vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 00.2vh;
			img {
				min-height: 9vh;
				max-height: 12vh;
			}
		}
	}
</style>

<script lang="ts" setup>
	const prop = defineProps({
		name: { type: String, required: true },
		dni: { type: String, required: true },
		activo: { type: Number },
		sexo: { type: String, required: true },
	})
</script>
