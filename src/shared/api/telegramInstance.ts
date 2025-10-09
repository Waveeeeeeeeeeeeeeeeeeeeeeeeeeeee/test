import axios from 'axios';

export const telegramRegisterInstance = axios.create({
	baseURL: '/api',
	timeout: 10000000000000,
	headers: {
		'Content-Type': 'application/json'
	}
});
