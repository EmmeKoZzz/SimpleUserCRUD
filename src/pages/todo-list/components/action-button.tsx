import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useMemo } from 'react';
import { TasksContext } from '../context';
import { deleteTask, editTask } from '../services';

export default function ActionButton({
	data: { id: taskId, insert_by: userId },
}: any) {
	const { setTasks } = useContext(TasksContext);
	const queryClient = useQueryClient();
	const { container, buttons, edit, del } = useMemo(() => {
		return {
			container:
				'!transition-all flex rounded-md text-base place-self-center overflow-hidden',
			buttons:
				'!transition-all bg-white hover:text-white p-1 border border-gray-500',
			edit: 'rounded-l-md border-r-0 hover:bg-light-blue-500 hover:border-light-blue-500',
			del: 'rounded-r-md hover:bg-red-300 hover:border-red-300',
		};
	}, []);

	// TODO create edit funcionality
	const { mutate: editfn } = useMutation(editTask);
	const handleEdit = useCallback(() => {}, []);

	const { mutate: delfn } = useMutation(deleteTask, {
		onError() {
			queryClient.invalidateQueries(['getTasks']);
		},
	});
	const handleDelete = useCallback(() => {
		delfn(taskId);
		setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
	}, [delfn, setTasks, taskId]);

	return (
		<div className="w-full h-full flex justify-center">
			<div className={container}>
				<button
					className={`${buttons} ${edit}`}
					type="button"
					onClick={handleEdit}
				>
					edit
				</button>
				<button
					className={`${buttons} ${del}`}
					type="button"
					onClick={handleDelete}
				>
					delete
				</button>
			</div>
		</div>
	);
}
