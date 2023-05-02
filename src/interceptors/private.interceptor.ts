import {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

export default (api: AxiosInstance) => {
	const onReq = (config: InternalAxiosRequestConfig) => {
		return config;
	};
	const onRes = (response: AxiosResponse) => response;

	const onReqError = () => {};
	const onResError = () => {};

	api.interceptors.request.use();
	api.interceptors.response.use();
};
