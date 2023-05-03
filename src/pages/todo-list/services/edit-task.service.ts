import jwt from 'jwt-decode';
import { tasksPrivateApi } from '../../../api';
import { INewTask } from '../models';

export default async ({ taskId, task }: INewTask) => {
	const userid = (jwt(sessionStorage.token) as { user_id: string }).user_id;
	return (
		await tasksPrivateApi.patch(`/tasks/${taskId}/`, {
			task,
			insert_by: userid,
		})
	).status;
};
