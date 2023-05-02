import { Dispatch, SetStateAction } from 'react';

export type StateObj<T> = {
	value: T;
	set: Dispatch<SetStateAction<T>>;
};
