import Header from "../header";
import './app.css';
import {useState} from "react";
import Column from "../column";
import NewColumn from "../new-column";
import {DragDropContext, DropResult, ResponderProvided} from "react-beautiful-dnd";

const App = () => {
    const [board, setBoard] = useState({
        columns: [
            {
                id: 0,
                title: 'Todo tasks',
            },
            {
                id: 1,
                title: 'sdasdas sadasks',
            },
        ],
        tasks: [
            {
                column: 0,
                id: 11,
                title: 'task1',
                text: 'text1 task'
            },
            {
                column: 0,
                id: 12,
                title: 'task2',
                text: 'text2 task'
            },
            {
                column: 1,
                id: 43,
                title: 'taskwew1',
                text: 'text1 task'
            },
            {
                column: 1,
                id: 435,
                title: 'tewewask2',
                text: 'text2 task'
            },
        ]
    });

    const [addingNewColumn, addNewColumn] = useState(false);

    const addTaskToState = (columnId: number, title: string, text: string) => {
        const tasks = {...board};
        tasks.tasks.push({
            column: columnId,
            id: Date.now(),
            title: title,
            text: text
        });

        setBoard(tasks);
    }

    const addColumnToState = (title: string) => {
        const columns = {...board};
        columns.columns.push({
            id: Date.now(),
            title: title
        });

        setBoard(columns);
    }

    const deleteTask = (taskId: number) => {
        const state = {...board};
        let tasks = [...board.tasks];

        tasks = tasks.filter(item => item.id !== taskId);

        state.tasks = tasks;

        setBoard(state);
    }

    const deleteColumn = (columnId: number) => {
        const state = {...board};

        let tasks = [...board.tasks];
        tasks = tasks.filter(item => item.column !== columnId);
        state.tasks = tasks;

        let columns = [...board.columns];
        columns = columns.filter(item => item.id !== columnId);
        state.columns = columns;

        setBoard(state);
    }

    const columns = board.columns.map(column => {
        const tasksFromColumn = board.tasks.filter(item => item.column === column.id);

        return <Column id={column.id} title={column.title} tasks={tasksFromColumn} key={column.id}
                       addTaskToState={addTaskToState} deleteTask={deleteTask} deleteColumn={deleteColumn}/>;
    });

    const clickAddColumn = () => {
        addNewColumn(true);
    }

    const confirmNewColumn = (title: string) => {
        if (title.trim().length > 0) {
            addNewColumn(false);
            addColumnToState(title);
        }
    }

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        const state = {...board};

        const movedTask = state.tasks.filter(item => item.id === Number(result.draggableId))[0];

        if (result.destination?.droppableId) {
            movedTask.column = Number(result.destination?.droppableId);
        }

        let tasks = [...board.tasks];
        tasks = tasks.filter(item => item.id !== Number(result.draggableId));
        tasks.push(movedTask);
        state.tasks = tasks;

        setBoard(state);
    }

    return (
        <div className="main-wrapper">
            <Header/>
            <div className="content-wrapper">
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns}
                    <NewColumn isAdding={addingNewColumn} clickAddColumn={clickAddColumn} confirmNewColumn={confirmNewColumn}/>
                </DragDropContext>
            </div>
        </div>
    )
}

export default App;