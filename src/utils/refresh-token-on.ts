import axios, { AxiosError } from 'axios';
import { refreshUser } from '../services';

export default async (status: number[], error: AxiosError) => {
	if (error.response && error.config) {
		if (status.includes(error.response.status)) return false;

		const { token } = await refreshUser(sessionStorage.token);
		localStorage.token = token;
		sessionStorage.token = token;

		const newConfig = error.config;
		newConfig.headers.Authorization = `Bearer ${token}`;

		axios(newConfig);
		return true;
	}
	return false;
};
