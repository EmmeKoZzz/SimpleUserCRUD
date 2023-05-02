/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from 'react-hook-form';

export type IInput = {
	className?: string;
	placeholder?: string;
	register?: UseFormRegister<any>;
	label?: string;
	name: string;
	feedback?: string;
	style?: {
		label?: string;
		input?: string;
		feedback?: string;
	};
};
