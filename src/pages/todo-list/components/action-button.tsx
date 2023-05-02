import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useMemo } from 'react';
import { deleteIcon, editIcon } from '../../../assets';
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
				'!transition-all flextext-base place-self-center flex w-full h-full',
			buttons: 'w-1/2 h-full border flex justify-center',
			edit: 'rounded-l-md border-r-0 bg-light-blue-600 border-light-blue-600 hover:border-light-blue-200 hover:bg-light-blue-200',
			del: 'rounded-r-md bg-red-600 border-red-600 hover:bg-red-200 hover:border-red-200',
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
					{editIcon}
				</button>
				<button
					className={`${buttons} ${del}`}
					type="button"
					onClick={handleDelete}
				>
					{deleteIcon}
				</button>
			</div>
		</div>
	);
}
