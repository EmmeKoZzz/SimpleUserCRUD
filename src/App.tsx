/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import LoguinExpress from './components/Login/login-express';
import Tasks from './components/TasksComponent/Tasks';
import { UserContext } from './contexts/autentification';
import { useTokenVerification } from './hooks/AuthHook';

const localToken = localStorage.getItem('token');

export default function App() {
	const { userId, setUserId } = useContext(UserContext);

	function successVerification(newToken: string) {
		localStorage.token = newToken;
		setUserId(newToken);
	}

	const { verifyToken } = useTokenVerification(successVerification, () =>
		localStorage.removeItem('token')
	);

	useEffect(() => {
		if (localToken !== null) verifyToken(localToken);
	}, []);

	return userId === null ? <LoguinExpress /> : <Tasks />;
}
