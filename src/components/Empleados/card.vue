<template>
	<div class="col-md-6 col-lg-3">
		<div class="card">
			<div class="card-body p-4 text-center">
				<img
					src="../../assets/sexo/f.png"
					class="avatar avatar-xl rounded mb-2"
					v-if="sexo === 'F'"
				/>
				<img src="../../assets/sexo/m.png" class="avatar avatar-xl rounded mb-2" v-else />
				<h3 class="m-0 mb-1">
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
				</h3>
				<div class="text-secondary">{{ prop.dni }}</div>
				<div class="mt-3">
					<span class="badge bg-green" v-if="activo">Activo</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const prop = defineProps({
		name: { type: String, required: true },
		dni: { type: String, required: true },
		activo: { type: Number },
		sexo: { type: String, required: true },
	})
</script>
