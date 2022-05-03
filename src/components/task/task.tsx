import './task.css';
import {Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import TableContext from "../context";
import {useContext} from "react";

const Task = (props: {
    id: number,
    order: number,
    title: string,
    text: string,
    deadlineDate: Date,
}) => {

    const contextProps = useContext(TableContext);

    const clickDeleteTask = () => {
        if (contextProps) {
            contextProps.deleteTask(props.id);
        }
    }

    let taskStatusClassName = 'task';
    const currentDate = Date.now();

    if (props.deadlineDate.getTime() - currentDate > 1000 * 60 * 60 * 24 * 3) {
        taskStatusClassName += ' ok';
    } else if (props.deadlineDate.getTime() > currentDate) {
        taskStatusClassName += ' warning';
    } else {
        taskStatusClassName += ' danger';
    }

    const handleEditTask = () => {
        if (contextProps) {
            contextProps.openModal({
                id: props.id,
                title: props.title,
                text: props.text,
                deadlineDate: props.deadlineDate,
            });
        }
    }

    return (
        <Draggable draggableId={String(props.id)} index={props.order}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                return (
                    <div className={taskStatusClassName}
                         ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="task-header">
                            {props.title}
                            <button className="edit-button" onClick={handleEditTask}>Edit</button>
                            <button onClick={clickDeleteTask}>X</button>
                        </div>
                        <p className="task-text">{props.text}</p>
                        <div className="task-deadline">Deadline: {props.deadlineDate.toDateString()}</div>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default Task;