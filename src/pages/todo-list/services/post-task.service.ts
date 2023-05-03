import jwt from 'jwt-decode';
import { tasksApi } from '../../../api';

export default async ({ task }: { task: string }) => {
	const dataForm = new FormData();
	const tokenData = jwt(sessionStorage.token) as { user_id: string };

	dataForm.append('insert_by', tokenData.user_id);
	dataForm.append('task', task);

	const { data } = await tasksApi.post('/tasks/', dataForm);
	return data;
};
