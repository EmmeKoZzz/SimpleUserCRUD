import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useMemo,
	useState,
} from 'react';

type ContextDefault = {
	userId: string | null;
	setUserId: Dispatch<SetStateAction<string | null>>;
};

const defaultContext = {
	userId: localStorage.getItem('token'),
	setUserId: () => {},
} as ContextDefault;

export const UserContext = createContext(defaultContext);

export default function UserProvider({ children }: { children: ReactNode }) {
	const [userId, setUserId] = useState<string | null>(null);
	const user = useMemo(() => ({ userId, setUserId }), [userId]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
