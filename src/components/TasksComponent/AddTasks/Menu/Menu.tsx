import { useContext, useEffect, useRef } from 'react';
import {
	calendarIcon,
	discIcon,
	loaderIcon,
	maximizeIcon,
	unlockIcon,
} from '../../../../assets/Icons';
import { AddTaskContext } from '../context/AddTasksContext';
import TaskMenuButton from './ButtonTaskList';

function TaskMenu() {
	const todayButtonRef = useRef<HTMLButtonElement>(null);
	const publicButtonRef = useRef<HTMLButtonElement>(null);
	const normalButtonRef = useRef<HTMLButtonElement>(null);
	const estimationButtonRef = useRef<HTMLButtonElement>(null);
	const buttonOkRef = useRef<HTMLButtonElement>(null);

	const [Text, SetText] = useContext(AddTaskContext).InputText;
	const SetMenu = useContext(AddTaskContext).MenuDisplay[1];

	/**
	 * * requests
	 */


	/**
	 * * Logic
	 */
	// ? ButtonAllower
	useEffect(() => {
		const Buttons = [
			todayButtonRef,
			publicButtonRef,
			normalButtonRef,
			estimationButtonRef,
		];

		const buttonOk =
			buttonOkRef.current === null ? new HTMLElement() : buttonOkRef.current;

		const buttonState = (buttons: typeof Buttons, state: boolean) => {
			buttons.map((button) =>
				state
					? button.current?.classList.add('disabled-button')
					: button.current?.classList.remove('disabled-button')
			);
		};

		if (Text === '') {
			buttonOk.innerHTML = 'Ok';
			buttonState(Buttons, true);
		} else {
			buttonOk.innerHTML = 'Add';
			buttonState(Buttons, false);
		}
	}, [Text]);

	const handleCancel = () => {
		SetText('');
		SetMenu(false);
	};

	// const {} = useP

	// TODO usar el hook usePostTask aqui y refrescar el query "getTasks"
	const handleOK = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		Text === '' ? SetMenu(false) : SetText('');
	};

	/**
	 * * Render
	 */
	return (
		<div className="flex justify-between border-t p-1 shadow-lg">
			<div className="flex">
				<TaskMenuButton className="mr-8 ">
					{maximizeIcon}
					<span className="hidden xl:flex">Open</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={todayButtonRef}>
					{calendarIcon}
					<span className="hidden xl:flex">Today</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={publicButtonRef}>
					{unlockIcon}
					<span className="hidden xl:flex">Public</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={normalButtonRef}>
					{discIcon}
					<span className="hidden xl:flex">Normal</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={estimationButtonRef}>
					{loaderIcon}
					<span className="hidden xl:flex">Estimation</span>
				</TaskMenuButton>
			</div>
			<div className="flex">
				<TaskMenuButton onClick={handleCancel} className="xl:flex hidden">
					Cancel
				</TaskMenuButton>
				<TaskMenuButton
					className="text-white !bg-[#0d54ce] !px-4"
					onClick={handleOK}
					Ref={buttonOkRef}
				>
					Ok
				</TaskMenuButton>
			</div>
		</div>
	);
}
//! END COMPONENT

export default TaskMenu;
