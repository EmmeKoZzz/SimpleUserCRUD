import { ApiTasksPrivate } from '../../../api/ApiConfig';

export default async function deleteTask(id: string) {
	const { status } = await ApiTasksPrivate.delete(`/tasks/${id}`);
	return status;
}