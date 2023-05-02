import { useMutation } from '@tanstack/react-query';
import { postTask } from '../pages/todo-list/services';

export default ({
	onError,
	onSuccess,
}: {
	onError: () => void;
	onSuccess: () => void;
}) => {
	const { mutate: post } = useMutation(postTask, { onError, onSuccess });
	return post;
};
