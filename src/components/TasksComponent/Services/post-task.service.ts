import jwt from 'jwt-decode';
import ApiTasks from '../../../api/ApiConfig';

export default async function postTask(task: {
	task: string;
	insert_by: number;
}) {
	const dataForm = new FormData();
	const tokenData = jwt(sessionStorage.token) as { user_id: string };

	dataForm.append('insert_by', tokenData.user_id);
	dataForm.append('task', task.task);

	const { data } = await ApiTasks.post('/tasks/', dataForm, {
		headers: {
			Authorization: `Bearer ${sessionStorage.token}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	return data;
}
