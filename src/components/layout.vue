<template>
	<header class="navbar navbar-expand-md d-print-none">
		<div class="container-xl">
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbar-menu"
				aria-controls="navbar-menu"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<h1
				class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"
			>
				<a>
					<brand-tabler-icon />
					mvs
				</a>
			</h1>
			<div class="navbar-nav flex-row order-md-last">
				<div class="nav-item dropdown">
					<a
						class="nav-link d-flex lh-1 text-reset p-0"
						data-bs-toggle="dropdown"
						aria-label="Open user menu"
					>
						<span
							class="avatar avatar-sm"
							style="
								background-image: url('https://lh3.googleusercontent.com/a/AAcHTtfqziLv-IICRktVv_ceR9wduZHlHAMDRfKJo5FCodlKrKM=s288-c-no');
							"
						></span>
						<div class="d-none d-xl-block ps-2">
							<div class="fs-5 fw-bold text-muted">{{ ustore.nombre }}</div>
							<div class="mt-1 small text-muted">{{ ustore.level }}</div>
						</div>
					</a>
					<div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
						<a @click="logout" class="dropdown-item">Logout</a>
					</div>
				</div>
			</div>
			<div class="collapse navbar-collapse" id="navbar-menu">
				<div
					class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center"
				>
					<ul class="navbar-nav">
						<RouterLink
							:to="{
								path: '/',
							}"
							class="nav-item"
							tag="li"
						>
							<a class="nav-link">
								<span class="nav-link-icon d-md-none d-lg-inline-block">
									<home-icon class="icon" />
								</span>
								<span class="nav-link-title"> Trabajadores </span>
							</a>
						</RouterLink>
						<RouterLink
							:to="{
								path: '/adenda',
							}"
							class="nav-item"
							tag="li"
							:exact-active-class="'active'"
						>
							<a class="nav-link">
								<span class="nav-link-icon d-md-none d-lg-inline-block">
									<home-icon class="icon" />
								</span>
								<span class="nav-link-title"> Adenda </span>
							</a>
						</RouterLink>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	import { userStore } from '@store/user'
	import { router } from '../router'

	const ustore = userStore()

	const logout = () => {
		localStorage.clear()
		router.go(0)
	}
</script>
