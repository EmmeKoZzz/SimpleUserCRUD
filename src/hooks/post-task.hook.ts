import { useMutation } from '@tanstack/react-query';
import { postTask } from '../api/TaskApi';

export default function usePostTask() {
	const { mutate: post } = useMutation(postTask);
	return post;
}
