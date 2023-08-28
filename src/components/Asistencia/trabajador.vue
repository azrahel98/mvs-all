<template>
	<div class="container-xl p-0 mt-0">
		<div class="page-body d-print-none cal">
			<div class="row row-cards align-center justify-content-center">
				<div class="col-md-4 col-sm-4 col-lg-2 infocard">
					<div class="card p-4 text-center">
						<div>
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

							<h3 class="m-0 mb-1">
								<RouterLink
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
							<div class="text-secondary">{{ prop.dni }}</div>
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
		padding: 0;
		margin: 0;
		margin-top: 1vh;
		.infocard {
			width: max-content;
			.card {
				padding: 1.5vh;
				.card-body {
					display: grid;
					grid-template-rows: auto min-content;
					row-gap: 2vh;
					.name {
						h3 {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							a {
								text-align: center;
								width: auto;
								min-width: min-content;
							}
						}
						.avatar {
							justify-self: center;
							text-align: center;
							padding: 0;
							margin: 0;
							--tblr-avatar-size: 3.2rem;
						}
					}
					.info {
						display: grid;
						grid-template-rows: 1fr 1fr;
						justify-content: center;
						row-gap: 2vh;

						div {
							max-width: 27vh;
						}
					}
				}
			}
		}
	}
</style>
