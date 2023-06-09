import jwt from 'jwt-decode';
import { tasksApi } from '../../../api';
import { INewTask } from '../models';

export default async ({ taskId, task }: INewTask) => {
	const userid = (jwt(sessionStorage.token) as { user_id: string }).user_id;
	return (
		await tasksApi.patch(`/tasks/${taskId}/`, {
			task,
			insert_by: userid,
		})
	).status;
};
