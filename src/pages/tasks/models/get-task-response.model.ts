import Task from './task.model';

export default interface GetTasksResponse {
	count: number;
	next: string;
	previous: string;
	results: Task[];
}
