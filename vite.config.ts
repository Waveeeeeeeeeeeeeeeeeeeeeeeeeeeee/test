import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
	let server: Record<string, any> = {}

	if (mode !== 'production') {
		server = {
			port: 443,
			host: 'tma.internal',
			https: true,
			proxy: {
				'/api': {
					target: 'http://77.238.235.94:15000',
					changeOrigin: true,
					secure: false, 
					rewrite: (path: string) => path.replace(/^\/api/, '')
				}
			}
		}
	}

	return {
		plugins: [react(), svgr(), basicSsl(), mkcert(), tailwindcss()],
		server,
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/')
			}
		}
	}
})
