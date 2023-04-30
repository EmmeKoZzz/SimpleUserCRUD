import ApiTasks from '../../../api/ApiConfig';
import GetTasksResponse from '../Models/get-task-response.model';

export default async function getTasks(): Promise<GetTasksResponse> {
	const { data } = await ApiTasks.get('/tasks/');
	return data;
}
