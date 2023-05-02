export default (success?: (data: string) => void, failure?: () => void) => {
	const verification = async (token: string) => {
		await verifyUser(token);
		const { token: newToken, pk: userID } = await refreshUser(token);
		return JSON.stringify({ newToken, userID });
	};

	const { mutate: verifyToken, status: verifing } = useMutation(verification, {
		onSuccess: success,
		onError: failure,
	});

	return {
		verifyToken,
		verifing,
	};
};
