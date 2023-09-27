<template>
	<div class="container-xl p-0 mt-0">
		<div class="page-body">
			<div class="card p-4 text-center">
				<div class="icono">
					<img
						src="../../assets/sexo/m.png"
						class="avatar avatar-xl rounded mb-2"
						v-if="sexo == 'M'"
					/>
					<img
						src="../../assets/sexo/f.png"
						class="avatar avatar-xl rounded mb-2"
						v-else
					/>
				</div>
				<div>
					<h3 class="m-0 mb-1">
						<RouterLink
							class="fs-4"
							:to="{
								name: 'perfil',
								params: {
									dni: dni,
								},
							}"
						>
							{{ prop.nombre }}
						</RouterLink>
					</h3>
					<div class="text-secondary fs-6">{{ prop.dni }}</div>
					<div class="info">
						<div class="text-muted fs-6 fw-bold">
							<checkbox-icon class="icon" /> {{ area }}
						</div>
						<div class="text-muted fs-6 fw-bold">
							<checkup-list-icon class="icon" /> {{ cargo }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const prop = defineProps({
		nombre: { type: String, required: true },
		dni: { type: String, required: true },
		area: { type: String, required: true },
		cargo: { type: String, required: true },
		sexo: { type: String },
	})
</script>

<style lang="scss" scoped>
	.page-body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		margin-top: 1vh;

		.card {
			display: grid;
			grid-template-columns: auto auto;
			grid-template-rows: min-content;
			column-gap: 1vh;
			width: max-content;
			justify-content: center;
			justify-self: center;

			padding: 1.2vh !important;
			.icono {
				width: max-content;
				justify-self: center;
			}
		}
	}
</style>
