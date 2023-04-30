import { useQuery } from '@tanstack/react-query';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import jwt from 'jwt-decode';
import { useContext, useMemo } from 'react';
import { TasksContext } from '../Context/tasks.context';
import getTasks from '../Services/get-tasks.service';

function ActionButton(row: any) {
	console.log(row);

	const { container, buttons, edit, del } = useMemo(() => {
		return {
			container:
				'!transition-all flex rounded-md text-base place-self-center overflow-hidden',
			buttons:
				'!transition-all bg-white hover:text-white p-1 border border-gray-500',
			edit: 'rounded-l-md border-r-0 hover:bg-light-blue-500 hover:border-light-blue-500',
			del: 'rounded-r-md hover:bg-red-300 hover:border-red-300',
		};
	}, []);

	return (
		<div className="w-full h-full flex justify-center">
			<div className={container}>
				<button className={`${buttons} ${edit}`} type="button">
					edit
				</button>
				<button className={`${buttons} ${del}`} type="button">
					delete
				</button>
			</div>
		</div>
	);
}

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

	/* 	const { mutate: edit } = useMutation(editTask);
	const { mutate: del } = useMutation(deleteTask); */

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
