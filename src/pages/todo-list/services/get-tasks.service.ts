import { tasksApi } from '../../../api';
import { GetTasksResponse } from '../models';

export default async function getTasks(): Promise<GetTasksResponse> {
	const { data } = await tasksApi.get('/tasks/');
	return data;
}
