import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogBody, Typography } from '@material-tailwind/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import TextInput from '../../../components/form-inputs/text-input';
import { useToggle } from '../../../hooks';
import { InputTypes } from '../../../models';
import { TasksContext } from '../context';
import { Task } from '../models';
import { editTask } from '../services';

const validationSchema = object().shape({
	task: string().required(),
});
type TaskInput = InferType<typeof validationSchema>;

export default function EditModal({
	handler,
	oldTask,
	taskId,
}: {
	handler: HTMLButtonElement;
	oldTask: string;
	taskId: number;
}) {
	/**
	 * * handle DISPLAY Modal
	 */
	const [show, setShow] = useState(false);
	useToggle(setShow, handler);

	/**
	 * * handle SUBMIT newTask
	 */
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<TaskInput>({ resolver: yupResolver(validationSchema) });
	const { setTasks } = useContext(TasksContext);
	const queryClient = useQueryClient();

	const onEditErr = () => queryClient.invalidateQueries(['getTasks']);
	const { mutate: edit } = useMutation(editTask, { onError: onEditErr });

	const onSubmit = (data: TaskInput) => {
		const changeTask = (tasks: Task[]) => {
			return tasks.map((task) => {
				if (task.id === taskId) {
					const newTask = task;
					newTask.task = data.task;
					return newTask;
				}
				return task;
			});
		};

		setTasks(changeTask);
		edit({ ...data, taskId });
	};

	/**
	 * * Render
	 */
	return (
		<Dialog open={show} handler={() => setShow(!show)} size="xl">
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogBody className="flex items-center h-full">
					<Typography className="mx-2 min-w-fit h-fit">New Task:</Typography>
					<TextInput
						type={InputTypes.text}
						className={classNames(
							'flex-grow transition-all border-2 p-1 duration-500 border-transparent',
							{
								'!border-red-400 rounded overflow-hidden': errors.task,
							}
						)}
						name="task"
						placeholder={oldTask}
						register={register}
						style={{
							input: classNames(
								'focus-visible:outline-none leading-relaxed caret-blue-gray-500 text-base flex-grow font-light'
							),
						}}
					/>
					<button
						type="submit"
						className="rounded-md ml-2 bg-light-blue-500 shadow-sm px-6 py-2 text-white font-bold uppercase"
					>
						ok
					</button>
				</DialogBody>
			</form>
		</Dialog>
	);
}
