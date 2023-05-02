export default (token: string): Promise<TokenResponse> => {
	const { data } = await ApiTasks.post('/api-token-verify/', { token });
	return data;
};
