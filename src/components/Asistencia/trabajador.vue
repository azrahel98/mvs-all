<template>
	<div class="container-xl p-0 mt-0">
		<div class="page-body d-print-none cal">
			<div class="row row-cards align-center justify-content-center">
				<div class="col-md-4 col-sm-4 col-lg-2 infocard">
					<div class="card">
						<div class="card-body p-1 text-center">
							<div class="name">
								<span class="avatar avatar-rounded">{{
									formatAPAName(prop.nombre)
								}}</span>
								<h3 class="m-0 mb-1">
									<a>{{ prop.nombre }}</a>
									<span>{{ prop.dni }}</span>
								</h3>
							</div>

							<div class="info">
								<div class="text-muted"><checkbox-icon /> {{ prop.area }}</div>
								<div class="text-muted"><checkup-list-icon /> {{ prop.cargo }}</div>
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
	})

	function formatAPAName(fullName: string): string {
		var nameArray = fullName.split(' ')
		var firstInitial = nameArray[0].charAt(0).toUpperCase()
		var middleInitial = ''

		if (nameArray.length > 2) {
			middleInitial = nameArray[1].charAt(0).toUpperCase()
		}

		var apaName = firstInitial + middleInitial

		return apaName
	}
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
						font-weight: 500;
						font-size: 0.7rem;
						div {
							max-width: 27vh;
						}
					}
				}
			}
		}
	}
</style>
