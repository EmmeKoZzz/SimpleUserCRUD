import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { refreshTokenOn } from '../utils';

export default (api: AxiosInstance) => {
	function onReq(config: InternalAxiosRequestConfig) {
		const newConfig = config;
		if (!config.headers.Authorization)
			newConfig.headers.Authorization = `Bearer ${sessionStorage.token}`;
		return newConfig;
	}

	async function onResError(error: AxiosError) {
		return (await refreshTokenOn([401, 400], error))
			? Promise.resolve()
			: Promise.reject(error);
	}

	api.interceptors.request.use(onReq, (err) => Promise.reject(err));
	api.interceptors.response.use((res) => res, onResError);

	return api;
};
