import AddTask from './Components/AddTasks/AddTask';
import TasksProvider from './Context/tasks.context';
import TasksList from './Components/TasksList';

export default function Tasks() {
	return (
		<TasksProvider>
			<AddTask />

			<TasksList />
		</TasksProvider>
	);
}
