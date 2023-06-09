import {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

export default (api: AxiosInstance) => {
	function Response(response: AxiosResponse) {
		console.log(response);
		return response;
	}
	function Request(reqConfig: InternalAxiosRequestConfig) {
		console.log(reqConfig);
		return reqConfig;
	}
	function Error(error: AxiosError) {
		console.log(error);
	}
	api.interceptors.response.use(Response, Error);
	api.interceptors.request.use(Request, Error);
};
