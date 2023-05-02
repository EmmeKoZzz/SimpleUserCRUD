import { tasksApi } from '../../../api';
import { TokenResponse } from '../../../models';
import { User } from '../models';

export default async ({ username, password }: User): Promise<TokenResponse> => {
	const { data } = await tasksApi.post('/api-token-auth/', {
		username,
		password,
	});
	return data;
};
