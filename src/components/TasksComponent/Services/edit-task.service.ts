import { ApiTasksPrivate } from '../../../api/ApiConfig';

export default async function editTask(id: string) {
	const { status } = await ApiTasksPrivate.patch(`/tasks/${id}`);
	return status;
}
