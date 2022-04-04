import './task.css';
import {Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";

const Task = (props: { id: number, title: string, text: string, deleteTask: (taskId: number) => void }) => {

    const clickDeleteTask = () => {
        props.deleteTask(props.id);
    }

    return (
        <Draggable draggableId={String(props.id)} index={props.id}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                return (
                    <div className="task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="task-header">
                            {props.title}
                            <button onClick={clickDeleteTask}>X</button>
                        </div>
                        <p className="task-text">{props.text}</p>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default Task;