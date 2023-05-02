/* eslint-disable import/prefer-default-export */
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export default (e: SyntheticEvent, set: Dispatch<SetStateAction<string>>) => {
	const { value } = e.target as HTMLInputElement;
	set(value);
};
