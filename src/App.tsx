/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './contexts';
import { useTokenVerification } from './hooks';
import LoguinExpress from './pages/login/login-express';
import Tasks from './pages/todo-list/Tasks';
import publicInterceptor from './interceptors/debbug.interceptor';
import { tasksApi } from './api';

const localToken = localStorage.getItem('token');

export default function App() {
	const { userId, setUserId } = useContext(UserContext);
	const [content, setContent] = useState(<div />);

	function successVerification(userData: string) {
		const { userID, newToken } = JSON.parse(userData);
		localStorage.token = newToken;
		sessionStorage.token = newToken;
		setUserId(userID);
		setContent(<Tasks />);
	}

	const { verifyToken } = useTokenVerification(successVerification, () => {
		localStorage.removeItem('token');
		setContent(<LoguinExpress />);
	});

	useEffect(() => {
		if (localToken !== null) verifyToken(localToken);
		else if (userId === -1) setContent(<LoguinExpress />);
		else setContent(<Tasks />);
	}, [userId]);

	return content;
}
