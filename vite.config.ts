import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { ServerOptions, defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	let server: ServerOptions = {};

	if (mode !== 'production') {
		server = {
			port: 3000,
			host: 'localhost',
			allowedHosts: true,
			proxy: {
				'/api': {
					target: 'https://api.acetest.site',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
					secure: false
				}
			}
		};
	}

	return {
		plugins: [react(), svgr(), tailwindcss()],
		server,
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/')
			}
		}
	};
});
