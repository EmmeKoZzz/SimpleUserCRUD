import ApiTasks from '../../../api/ApiConfig';

export default async ({ username, password }: User): Promise<TokenResponse> => {
	const { data } = await ApiTasks.post('/api-token-auth/', {
		username,
		password,
	});
	return data;
};
