import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: '/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'X-Access-Token': 's.RzpsCwccQ8gcPSPR3sQIVR4z',
		'X-Token-Version': 'DATING_V1'
	}
});

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		return Promise.reject(error);
	}
);
