import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: '/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'X-Access-Token': '1234567890',
		'X-Token-Version': '1234567890'
	}
});

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		return Promise.reject(error);
	}
);
