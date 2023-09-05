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
				<!-- <div class="d-none d-md-flex">
					<div class="nav-item dropdown d-none d-md-flex me-3">
						<a
							class="nav-link px-0"
							data-bs-toggle="dropdown"
							tabindex="-1"
							aria-label="Show notifications"
						>
							<bell-icon class="icon" />
							<span class="badge bg-red"></span>
						</a>
					</div>
				</div> -->
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
							<div>Raul Chercca</div>
							<div class="mt-1 small text-muted">Admin</div>
						</div>
					</a>
					<div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
						<a href="#" class="dropdown-item">Status</a>
						<a href="./profile.html" class="dropdown-item">Profile</a>
						<a href="#" class="dropdown-item">Feedback</a>
						<div class="dropdown-divider"></div>
						<a href="./settings.html" class="dropdown-item">Settings</a>
						<a @click="logout" class="dropdown-item">Logout</a>
					</div>
				</div>
			</div>
			<div class="collapse navbar-collapse" id="navbar-menu">
				<div
					class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center"
				>
					<ul class="navbar-nav">
						<li class="nav-item">
							<RouterLink
								:to="{
									path: '/',
								}"
								class="nav-link"
								tag="a"
							>
								<span class="nav-link-icon d-md-none d-lg-inline-block">
									<home-icon class="icon" />
								</span>
								<span class="nav-link-title"> Trabajadores </span>
							</RouterLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	import { router } from '../router'

	const logout = () => {
		localStorage.clear()
		router.go(0)
	}
</script>
