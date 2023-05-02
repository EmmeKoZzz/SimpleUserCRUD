import { tasksApi } from '../api';

export default async (token: string) => {
	await tasksApi.post('/api-token-verify/', { token });
};
