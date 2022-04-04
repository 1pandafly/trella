import Task from "../task";
import './column.css';
import {useState} from "react";
import NewTask from "../new-task";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";

type TaskItem = {
    column: number,
    id: number,
    title: string,
    text: string
}

const Column = (props: {
    id: number,
    title: string,
    tasks: TaskItem[],
    addTaskToState: (columnId: number, title: string, text: string) => void,
    deleteTask: (taskId: number) => void,
    deleteColumn: (columnId: number) => void
}) => {

    const tasks = props.tasks.map(task => {
        return <Task id={task.id} title={task.title} text={task.text} key={task.id} deleteTask={props.deleteTask}/>;
    });

    const [addingNewTask, addNewTask] = useState(false);

    const clickAddTask = () => {
        addNewTask(true);
    }

    const confirmNewTask = (title: string, text: string) => {
        if (title.trim().length > 0) {
            addNewTask(false);
            props.addTaskToState(props.id, title, text);
        }
    }

    const clickDeleteColumn = () => {
        props.deleteColumn(props.id);
    }

    return (
        <Droppable droppableId={String(props.id)}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                return (
                    <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="column-heading">
                            {props.title}
                            <button onClick={clickDeleteColumn}>X</button>
                        </div>
                        <div >
                            {tasks}
                        </div>
                        <NewTask isAdding={addingNewTask} clickAddTask={clickAddTask} confirmNewTask={confirmNewTask}/>
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    );
}

export default Column;