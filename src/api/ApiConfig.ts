import axios from 'axios';

const ApiTasks = axios.create({
	baseURL: import.meta.env.VITE_API_TASKS,
});

export default ApiTasks;
