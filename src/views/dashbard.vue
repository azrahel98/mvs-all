<template>
	<div class="page">
		<Layout></Layout>

		<RouterView></RouterView>
	</div>
</template>
<script lang="ts" setup>
	import Layout from '@components/layout.vue'
</script>

<style lang="scss">
	@media print {
		aside {
			display: none !important;
			background-color: white !important;
		}
		.navbar {
			display: none !important;
			background-color: white !important;
		}
	}
</style>
