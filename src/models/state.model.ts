/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export type State<T> = [T, Dispatch<SetStateAction<T>>];
