import { useMutation } from '@tanstack/react-query';
import { getTasks } from '../api/TaskApi';

export default function useGetTasks() {
	const { mutate: GetTasks, status: fetchingTasks } = useMutation(getTasks);
	return { GetTasks, fetchingTasks };
}
