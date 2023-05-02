import AddTask from './components/AddTasks/AddTask';
import TasksList from './components/tasks-list';
import TasksProvider from './context/tasks.context';

export default function Tasks() {
	return (
		<TasksProvider>
			<AddTask />
			<TasksList />
		</TasksProvider>
	);
}
