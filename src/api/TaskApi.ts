import ApiTasks, { ApiTasksPrivate } from './ApiConfig';

export type Task = {
	id: number;
	task: string;
	insert_by: number;
	user_name: string;
	created_at: string;
	updated_at: string;
};

type GetTasksResponse = {
	count: number;
	next: string;
	previous: string;
	results: Task[];
};

export async function getTasks(): Promise<GetTasksResponse> {
	const { data } = await ApiTasks.get('/tasks/');
	return data;
}

export async function postTask(task: { task: string; insert_by: number }) {
	const { data } = await ApiTasksPrivate.post('/tasks/', task, {
		withCredentials: true,
	});
	return data;
}
