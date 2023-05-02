import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { deleteIcon, editIcon } from '../../../assets';
import { TasksContext } from '../context';
import { deleteTask } from '../services';
import EditModal from './edit-modal';

export default function ActionButton({
	data: { id: taskId, insert_by: userId, task },
}: any) {
	const showModal = useState(true);
	const { setTasks } = useContext(TasksContext);
	const editRef = useRef(document.createElement('button'));

	/**
	 * * Handle DELETE task
	 */
	const queryClient = useQueryClient();
	const { mutate: delfn } = useMutation(deleteTask, {
		onError() {
			queryClient.invalidateQueries(['getTasks']);
		},
	});
	const handleDelete = useCallback(() => {
		delfn(taskId);
		setTasks((tasks) => tasks.filter((Task) => Task.id !== taskId));
	}, [delfn, setTasks, taskId]);

	/**
	 * * Styles
	 */
	const { container, buttons, edit, del } = useMemo(() => {
		return {
			container:
				'!transition-all flextext-base place-self-center flex w-full h-full',
			buttons: 'w-1/2 h-full border flex justify-center',
			edit: 'rounded-l-md border-r-0 bg-light-blue-600 border-light-blue-600 hover:border-light-blue-200 hover:bg-light-blue-200',
			del: 'rounded-r-md bg-red-600 border-red-600 hover:bg-red-200 hover:border-red-200',
		};
	}, []);

	/**
	 * * Render
	 */
	return (
		<div className="w-full h-full flex justify-center">
			<div className={container}>
				<button className={`${buttons} ${edit}`} type="button" ref={editRef}>
					<EditModal
						handler={editRef.current}
						oldTask={task}
						userId={userId}
						taskId={taskId}
					/>
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
