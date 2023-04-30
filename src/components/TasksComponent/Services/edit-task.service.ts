import jwt from 'jwt-decode';
import { ApiTasksPrivate } from '../../../api/ApiConfig';
import INewTask from '../Models/new-task.model';

export default async function editTask({ taskId, newTask }: INewTask) {
	const userid = (jwt(sessionStorage.token) as { user_id: string }).user_id;
	return (
		await ApiTasksPrivate.patch(`/tasks/${taskId}`, {
			task: newTask,
			insert_by: userid,
		})
	).status;
}
