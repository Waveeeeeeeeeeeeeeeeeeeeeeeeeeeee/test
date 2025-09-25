import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
// import fs from 'fs';
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
			// https: {
			// 	key: fs.readFileSync('./certs/tma.internal-key.pem'),
			// 	cert: fs.readFileSync('./certs/tma.internal.pem')
			// },
			proxy: {
				'/api': {
					target: 'https://api.acetest.site', // адрес твоего тестового API
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
					secure: false // если сервер HTTP или самоподписанный
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
