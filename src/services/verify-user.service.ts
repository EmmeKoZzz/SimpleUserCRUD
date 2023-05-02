export default async (token: string) => {
	await ApiTasks.post('/api-token-verify/', { token });
};
