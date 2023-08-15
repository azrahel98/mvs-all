<template>
	<div class="d-flex flex-column">
		<div class="page page-center">
			<div class="container container-normal py-4">
				<div class="row align-items-center g-4">
					<div class="col-lg">
						<div class="container-tight">
							<div class="text-center mb-4">
								<a class="navbar-brand navbar-brand-autodark">
									<img src="@assets/logo.svg" height="36" />
								</a>
							</div>
							<div class="card card-md">
								<div class="card-body">
									<h2 class="h2 text-center mb-4">Inicia Sesion</h2>
									<form autocomplete="off" @submit.prevent="login" v-show="!loading">
										<div class="mb-3">
											<label class="form-label">Usuario</label>
											<input
												type="text"
												class="form-control"
												:class="message.code == 1 ? 'is-invalid' : ''"
												autocomplete="false"
												v-model="nickname"
											/>
											<div class="invalid-feedback">{{ message.message }}</div>
										</div>
										<div class="mb-2">
											<label class="form-label"> Contraseña </label>
											<div class="input-group input-group-flat">
												<input
													:type="showpass ? 'text' : 'password'"
													class="form-control"
													:class="message.code == 2 ? 'is-invalid' : ''"
													autocomplete="false"
													placeholder="************"
													v-model="password"
												/>
												<span class="input-group-text">
													<a class="link-secondary" @click="() => (showpass = !showpass)">
														<eye-icon class="icon" v-if="!showpass" />
														<eye-x-icon class="icon" v-else />
													</a>
												</span>
												<div class="invalid-feedback">{{ message.message }}</div>
											</div>
										</div>

										<div class="form-footer">
											<button type="submit" class="btn btn-primary w-100">Iniciar</button>
										</div>
									</form>
									<LoadingTemplate v-show="loading"></LoadingTemplate>
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
	import { reactive, ref } from 'vue'
	import { httpService } from '@utils/api'
	import { AxiosError } from 'axios'
	import LoadingTemplate from '@components/loading.vue'
	import { router } from '../router'

	const nickname = ref('')
	const password = ref('')
	const loading = ref(false)
	const showpass = ref(false)

	const message = reactive({
		code: 0,
		message: '',
	})

	const login = async () => {
		loading.value = true
		try {
			const response = await httpService.post('/api/login', {
				nickname: nickname.value,
				password: password.value,
			})
			message.code = 0
			localStorage.setItem('token', response.data.token)
			router.replace({ path: '/' })
		} catch (error: any) {
			var err = error as AxiosError

			if (err.response) {
				message.code = (err.response.data as any).code
				message.message = (err.response.data as any).message
			}
		}
		loading.value = false
	}
</script>

<style lang="css" scoped>
	.card-body {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
