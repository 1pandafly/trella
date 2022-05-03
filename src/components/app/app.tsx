import Header from "../header";
import './app.css';
import {useState} from "react";
import Column from "../column";
import NewColumn from "../new-column";
import {DragDropContext, DropResult, ResponderProvided} from "react-beautiful-dnd";
import Modal from "../modal";
import EditTask from "./type";
import TableContext from "../context/context";

interface MyContext {
    deleteTask: (taskId: number) => void,
    openModal: (task: EditTask) => void,
}

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
                columnId: 0,
                order: 1,
                id: 414,
                title: 't1',
                text: 'text1 task1',
                deadlineDate: new Date('2022-04-05'),
            },
            {
                columnId: 0,
                order: 22,
                id: 43,
                title: 't2',
                text: 'text2 task',
                deadlineDate: new Date('2022-05-07'),
            },
            {
                columnId: 1,
                order: 1,
                id: 73,
                title: 't3',
                text: 'text1 task',
                deadlineDate: new Date('2022-04-09'),
            },
            {
                columnId: 1,
                order: 4,
                id: 4,
                title: 't4',
                text: 'text2 task',
                deadlineDate: new Date('2022-04-11'),
            },
        ]
    });

    const [addingNewColumn, addNewColumn] = useState(false);

    const [editedTask, setEditedTask] = useState({
        id: -1,
        title: '',
        text: '',
        deadlineDate: new Date(),
        isOpen: false
    });

    const openModal = (task: EditTask) => {
        setEditedTask(prevState => {
            return {...task, isOpen: true}
        });
    }

    const closeModal = () => {
        setEditedTask(prevState => {
            return {...prevState, isOpen: false}
        })
    }

    const addTaskToState = (columnId: number, title: string, text: string, deadlineDate: Date) => {
        setBoard(prevState => {
            const tasksFromCurrentColumn = prevState.tasks.filter(task => task.columnId === columnId)
            let newOrderIndex;

            if (tasksFromCurrentColumn.length === 0) {
                newOrderIndex = 0;
            } else {
                newOrderIndex = tasksFromCurrentColumn.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue.order), tasksFromCurrentColumn[0].order) + 1;
            }

            const newState = {...prevState};
            newState.tasks.push({
                columnId: columnId,
                id: Date.now(),
                title: title,
                text: text,
                deadlineDate: deadlineDate,
                order: newOrderIndex
            });

            return newState;
        });
    }

    const addColumnToState = (title: string) => {
        setBoard(prevState => {
            const columns = {...prevState};
            columns.columns.push({
                id: Date.now(),
                title: title
            });

            return columns;
        });
    }

    const deleteTask = (taskId: number) => {
        setBoard(prevState => {
            const state = {...board};
            let tasks = [...board.tasks];

            tasks = tasks.filter(item => item.id !== taskId);

            state.tasks = tasks;

            return state;
        })
    }

    const deleteColumn = (columnId: number) => {
        const state = {...board};

        let tasks = [...board.tasks];
        tasks = tasks.filter(item => item.columnId !== columnId);
        state.tasks = tasks;

        let columns = [...board.columns];
        columns = columns.filter(item => item.id !== columnId);
        state.columns = columns;

        setBoard(state);
    }

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
        setBoard(prevState => {
            const newState = {...prevState};
            const newColumn = Number(result.destination?.droppableId);
            let newOrder = Number(result.destination?.index);

            let tasks = newState.tasks.map(task => {
                if (task.columnId === newColumn) {
                    if (task.order >= newOrder) {
                        task.order = task.order + 1;
                    }
                }

                return task;
            });

            tasks = tasks.filter(item => item.id !== Number(result.draggableId));

            const movedTask = newState.tasks.filter(item => item.id === Number(result.draggableId))[0];
            movedTask.order = newOrder;

            if (result.destination?.index && result.destination?.index >= result.source.index && movedTask.columnId === newColumn) {
                movedTask.order = newOrder + 2;
            }

            if (result.destination?.droppableId) {
                movedTask.columnId = newColumn;
            }

            tasks.push(movedTask);

            newState.tasks = tasks;

            return newState;
        })
    }

    const confirmEditedTask = (editedTask: EditTask) => {
        setEditedTask(prevState => {
            return {...prevState, isOpen: false}
        });

        setBoard(prevState => {
            const tasks = [...prevState.tasks];

            tasks.map((task) => {
                if (task.id === editedTask.id) {
                    task.title = editedTask.title;
                    task.text = editedTask.text;
                    task.deadlineDate = editedTask.deadlineDate;
                }

                return task;
            });

            return {...prevState, ...tasks};
        });
    }

    const contextForTasks: MyContext = {
        deleteTask,
        openModal
    }

    const columns = board.columns.map(column => {
        const tasksFromColumn = board.tasks.filter(item => item.columnId === column.id);

        return <Column
            id={column.id}
            title={column.title}
            tasks={tasksFromColumn}
            key={column.id}
            addTaskToState={addTaskToState}
            deleteColumn={deleteColumn}
        />;
    });

    return (
        <div className="main-wrapper">
            <Header/>
            <TableContext.Provider value={contextForTasks}>
                <div className="content-wrapper">
                    <DragDropContext onDragEnd={onDragEnd}>
                        {columns}
                        <NewColumn isAdding={addingNewColumn} clickAddColumn={clickAddColumn}
                                   confirmNewColumn={confirmNewColumn}/>
                    </DragDropContext>
                </div>
                <Modal modalIsOpen={editedTask.isOpen} closeModal={closeModal} taskInfo={editedTask}
                       confirmEditedTask={confirmEditedTask}/>
            </TableContext.Provider>
        </div>
    )
}

export default App;