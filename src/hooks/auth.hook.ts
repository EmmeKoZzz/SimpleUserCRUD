import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TokenResponse } from '../models';
import { authLogin } from '../pages/login/Services';

export default (
	success?: (data: TokenResponse) => void,
	error?: (error: AxiosError) => void
) => {
	const {
		mutate: authUser,
		isSuccess: authSuccess,
		isLoading: authLoading,
		isError: authError,
		data: userData,
	} = useMutation(authLogin, { onSuccess: success, onError: error });

	type AuthHook = {
		authUser: typeof authUser;
		userData: TokenResponse;
		authLoading: boolean;
		authSuccess: boolean;
		authError: boolean;
	};

	return {
		authUser,
		userData,
		authLoading,
		authSuccess,
		authError,
	} as AuthHook;
};
