import { useQuery } from '@tanstack/react-query';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { useContext, useMemo } from 'react';
import { TasksContext } from '../context';
import { getTasks } from '../services';
import ActionButton from './action-button';

export default function TasksList() {
	const columns = useMemo(
		() => [
			{ field: 'id', headerName: 'Task #' },
			{ field: 'task', headerName: 'Task' },
			{ field: 'user_name', headerName: 'User' },
			{ field: 'created_at', headerName: 'Created' },
			{ field: 'updated_at', headerName: 'Last Update' },
			{
				field: 'actions',
				headerName: 'Actions',
				cellRenderer: ActionButton,
			},
		],
		[]
	);

	const { tasks, setTasks } = useContext(TasksContext);

	const Tasks = useQuery(['getTasks'], getTasks, {
		onSuccess(data) {
			setTasks(data.results);
		},
	});

	const defaultColOpt = useMemo(() => {
		return {
			flex: 1,
			minWidth: 100,
			sortable: true,
			resizable: true,
		};
	}, []);

	if (Tasks.isSuccess)
		return (
			<div className="ag-theme-alpine my-1 p-10 h-[600px] w-full">
				<AgGridReact
					defaultColDef={defaultColOpt}
					rowData={tasks}
					columnDefs={columns}
				/>
			</div>
		);
	return <div />;
}
