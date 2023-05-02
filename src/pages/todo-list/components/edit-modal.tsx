import { Dialog, DialogBody, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import TextInput from '../../../components/form-inputs/text-input';
import { useToggle } from '../../../hooks';
import { InputTypes } from '../../../models';

export default function EditModal({
	handler,
	oldTask,
	userId,
	taskId,
}: {
	handler: HTMLButtonElement;
	oldTask: string;
	userId: number;
	taskId: number;
}) {
	const [show, setShow] = useState(false);
	useToggle(setShow, handler);

	/**
	 * * Render
	 */
	return (
		<Dialog open={show} handler={() => setShow(!show)}>
			<DialogBody className="flex items-center h-full">
				<Typography className="mx-2 min-w-fit h-fit">New Task:</Typography>
				<TextInput
					type={InputTypes.text}
					className="flex-grow"
					name="editField"
					placeholder={oldTask}
					style={{
						input:
							'focus-visible:outline-none leading-relaxed caret-blue-gray-500 text-base flex-grow font-light',
					}}
				/>
				<button
					type="submit"
					className="rounded-md ml-2 bg-light-blue-500 shadow-sm px-6 py-2 text-white font-bold uppercase"
				>
					ok
				</button>
			</DialogBody>
		</Dialog>
	);
}
