import { tasksPrivateApi } from '../api';
import { TokenResponse } from '../models';

export default async (token: string): Promise<TokenResponse> => {
	const { data } = await tasksPrivateApi.post('/api-token-verify/', { token });
	return data;
};
