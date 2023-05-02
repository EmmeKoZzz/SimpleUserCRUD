import { tasksPrivateApi } from '../../../api';

export default async (id: string) => {
	const { status } = await tasksPrivateApi.delete(`/tasks/${id}`);
	return status;
};
