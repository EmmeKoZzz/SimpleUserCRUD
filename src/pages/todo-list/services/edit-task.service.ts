import jwt from 'jwt-decode';
import { tasksPrivateApi } from '../../../api';
import { INewTask } from '../models';

export default async ({ taskId, newTask }: INewTask) => {
	const userid = (jwt(sessionStorage.token) as { user_id: string }).user_id;
	return (
		await tasksPrivateApi.patch(`/tasks/${taskId}`, {
			task: newTask,
			insert_by: userid,
		})
	).status;
};
