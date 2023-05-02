import jwt from 'jwt-decode';
import { ApiTasksPrivate } from '../../../api/ApiConfig';

export default async function postTask({ task }: { task: string }) {
	const dataForm = new FormData();
	const tokenData = jwt(sessionStorage.token) as { user_id: string };

	dataForm.append('insert_by', tokenData.user_id);
	dataForm.append('task', task);

	const { data } = await ApiTasksPrivate.post('/tasks/', dataForm, {
		headers: { Authorization: `Bearer ${sessionStorage.token}` },
	});
	return data;
}
