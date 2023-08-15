<template>
	<div class="page-wrapper">
		<div class="page-header d-print-none">
			<div class="container-xl">
				<div class="row g-2 align-items-center">
					<div class="col">
						<h2 class="page-title">Trabajadores</h2>
						<div class="text-secondary mt-1">Activos y no Activos</div>
					</div>
					<div class="col-auto ms-auto d-print-none">
						<div class="d-flex">
							<input
								type="search"
								class="form-control d-inline-block w-9 me-3"
								placeholder="Pepito Perez"
							/>
							<a class="btn btn-primary">
								<plus-icon class="icon" />
								Trabajador
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-body">
			<div class="container-xl">
				<div class="row row-cards align-content-center justify-content-center">
					<card v-for="_x in 5"></card>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import card from '@components/Empleados/card.vue'
</script>
