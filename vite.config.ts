import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		port: 80,
	},
	resolve: {
		alias: {
			'@views': path.resolve(__dirname, './src/views'),
			'@components': path.resolve(__dirname, './src/components'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
})
