import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslintPlugin from 'vite-plugin-eslint'
// @ts-ignore
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				icon: false,
			},
		}),
		tsconfigPaths(),
		eslintPlugin({
			cache: false,
		}),
	],
	base: '',
	build: {
		outDir: 'build',
	},
})
