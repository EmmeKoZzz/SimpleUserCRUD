import { AxiosError, AxiosInstance } from 'axios';
import { refreshTokenOn } from '../utils';

export default (api: AxiosInstance) => {
	async function Error(error: AxiosError) {
		if (!(await refreshTokenOn([400], error))) return Promise.reject(error);
	}

	api.interceptors.response.use((res) => res, Error);
	return api;
};
