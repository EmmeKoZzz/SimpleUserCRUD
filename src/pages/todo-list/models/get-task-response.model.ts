import { Task } from './task.model';

export type GetTasksResponse = {
	count: number;
	next: string;
	previous: string;
	results: Task[];
};
