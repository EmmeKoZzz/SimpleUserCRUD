import { createContext, ReactNode, useState, useMemo } from 'react';
import { State } from '../../../../../models';

const defaultContext = {
	MenuDisplay: [true, () => {}] as State<boolean>,
	InputText: ['', () => {}] as State<string>,
};

export const AddTaskContext = createContext(defaultContext);

export default function AddTaskContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const menuDisplayState: State<boolean> = useState(false);
	const inputTextState: State<string> = useState('');
	const context = useMemo(
		() => ({
			MenuDisplay: menuDisplayState,
			InputText: inputTextState,
		}),
		[menuDisplayState, inputTextState]
	);

	return (
		<AddTaskContext.Provider value={context}>
			{children}
		</AddTaskContext.Provider>
	);
}
