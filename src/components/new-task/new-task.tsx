import './new-task.css';
import React, {useRef} from "react";

const NewTask = (props: {
                     isAdding: boolean,
                     clickAddTask: () => void,
                     confirmNewTask: (title: string, text: string) => void
                 }) => {

    const taskTitle = useRef<HTMLInputElement>(null);
    const taskText = useRef<HTMLTextAreaElement>(null);

    const confirmForm = () => {
        if (taskTitle.current && taskText.current) {
            props.confirmNewTask(taskTitle.current.value, taskText.current.value);
        }
    }

    if (props.isAdding) {
        return (
            <div className="form-add-task">
                <p className="heading">Create new task:</p>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" ref={taskTitle}/>
                <label htmlFor="text">Task text</label>
                <textarea id="text" name="text" ref={taskText}/>
                <button type="button" onClick={confirmForm}>Confirm</button>
            </div>
        )
    } else {
        return (
            <button className="btn-add-new-task" onClick={props.clickAddTask}>
                Add new task
            </button>
        )
    }
}

export default NewTask;