import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { deleteTask, postTask } from '../pages/todo-list/services';
import { refreshUser } from '../services';

export default (api: AxiosInstance) => {
	function onReq(config: InternalAxiosRequestConfig) {
		const newConfig = config;
		if (!config.headers.Authorization)
			newConfig.headers.Authorization = `Bearer ${sessionStorage.token}`;
		return newConfig;
	}

	const onResError = async ({ response, config }: AxiosError) => {
		if (response?.status === 401 && config) {
			const { token: newToken } = await refreshUser(sessionStorage.token);
			sessionStorage.setItem('token', newToken);
			localStorage.setItem('token', newToken);

			const newConfig = config;
			newConfig.headers.Authorization = `Bearer ${sessionStorage.token}`;

			axios(newConfig);
		}
	};

	api.interceptors.request.use(onReq, (err) => Promise.reject(err));
	api.interceptors.response.use((res) => res, onResError);

	return api;
};
