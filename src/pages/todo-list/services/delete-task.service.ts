import { tasksApi } from '../../../api';

export default async (id: string) => {
	const { status } = await tasksApi.delete(`/tasks/${id}`);
	return status;
};
