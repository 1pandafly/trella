import Task from "../task";
import './column.css';
import {useState} from "react";
import NewTask from "../new-task";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import {TaskItem} from "./type";

const Column = (props: {
    id: number,
    title: string,
    tasks: TaskItem[],
    addTaskToState: (columnId: number, title: string, text: string, deadlineDate: Date) => void,
    deleteColumn: (columnId: number) => void,
}) => {

    const [addingNewTask, addNewTask] = useState(false);

    const clickAddTask = () => {
        addNewTask(true);
    }

    const confirmNewTask = (title: string, text: string, deadlineDate: Date) => {
        if (title.trim().length > 0) {
            addNewTask(false);
            props.addTaskToState(props.id, title, text, deadlineDate);
        }
    }

    const clickDeleteColumn = () => {
        props.deleteColumn(props.id);
    }

    const tasks = props.tasks
        .sort((a: TaskItem, b: TaskItem) => {
            return a.order - b.order;
        })
        .map(task => {
        return (
            <Task
                id={task.id}
                order={task.order}
                title={task.title}
                text={task.text}
                deadlineDate={task.deadlineDate}
                key={task.id}
            />
        );
    });

    return (
        <div className="column">
            <div className="column-heading">
                {props.title}
                <button onClick={clickDeleteColumn}>X</button>
            </div>
            <Droppable droppableId={String(props.id)}>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                    return (
                        <div className="column-tasks-wrapper" ref={provided.innerRef} {...provided.droppableProps}>
                            {tasks}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            <NewTask isAdding={addingNewTask} clickAddTask={clickAddTask} confirmNewTask={confirmNewTask}/>
        </div>
    );
}

export default Column;