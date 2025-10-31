import axios from 'axios';

import { getApiBaseURL } from './config';
import { useUserStore } from '@/entities/user/model/store';

export const telegramRegisterInstance = axios.create({
	baseURL: getApiBaseURL(),
	timeout: 10000000000000,
	headers: {
		'Content-Type': 'application/json'
	}
});

telegramRegisterInstance.interceptors.request.use(config => {
	const initData = useUserStore.getState().telegramInitData as string | null;

	const runtimeInitData = (
		window as unknown as { Telegram?: { WebApp?: { initData?: string } } }
	).Telegram?.WebApp?.initData;

	const lsInitData = localStorage.getItem('debug_init_data');

	let headerValue = initData || runtimeInitData || lsInitData || '';

	if (headerValue && typeof headerValue === 'string') {
		try {
			let parsed: Record<string, unknown> = {};

			if (headerValue.startsWith('{')) {
				parsed = JSON.parse(headerValue);
				if (
					parsed.user &&
					typeof parsed.user === 'object' &&
					!Array.isArray(parsed.user)
				) {
					parsed.user = JSON.stringify(parsed.user);
				}
				headerValue = JSON.stringify(parsed);
			} else if (headerValue.includes('\\n') || headerValue.includes('\n')) {
				const parts = headerValue.split(/\\n|\n/);
				for (const part of parts) {
					const eqIndex = part.indexOf('=');
					if (eqIndex > 0) {
						const key = part.substring(0, eqIndex).trim();
						const value = part.substring(eqIndex + 1).trim();
						if (key === 'user') {
							parsed[key] = value;
						} else if (key === 'auth_date') {
							const num = Number(value);
							parsed[key] = Number.isFinite(num) ? num : value;
						} else {
							parsed[key] = value;
						}
					}
				}
				headerValue = JSON.stringify(parsed);
			} else {
				const params = new URLSearchParams(headerValue);
				for (const [key, value] of params.entries()) {
					const decoded = decodeURIComponent(value);
					if (key === 'user') {
						parsed[key] = decoded;
					} else if (key === 'auth_date') {
						const num = Number(decoded);
						parsed[key] = Number.isFinite(num) ? num : decoded;
					} else {
						parsed[key] = decoded;
					}
				}
				headerValue = JSON.stringify(parsed);
			}
		} catch {
			headerValue = headerValue.trim();
		}
		if (headerValue === '') {
			headerValue = '';
		}
	} else {
		headerValue = '';
	}

	try {
		const headers = (config.headers || {}) as unknown as Record<
			string,
			unknown
		>;

		if (headers && typeof headers === 'object' && !Array.isArray(headers)) {
			if (typeof headerValue === 'string') {
				headers['X-Telegram-Init-Data'] = headerValue;
			} else {
				console.error(
					'Invalid header value type:',
					typeof headerValue,
					headerValue
				);
				headers['X-Telegram-Init-Data'] = '';
			}
		}
	} catch (e) {
		console.error('Error setting headers in telegramRegisterInstance:', e);
	}

	console.log('telegramRegisterInstance interceptor: запрос', {
		method: config.method,
		url: config.url,
		hasInitData: !!headerValue,
		headerValueLength: headerValue?.length || 0
	});

	return config;
});
