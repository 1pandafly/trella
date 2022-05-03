import './new-task.css';
import React, {useState} from "react";

const NewTask = (props: {
                     isAdding: boolean,
                     clickAddTask: () => void,
                     confirmNewTask: (title: string, text: string, deadlineDate: Date) => void
                 }) => {

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        deadlineDate: new Date()
    });

    const confirmForm = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (formData.title && formData.text) {
            props.confirmNewTask(formData.title, formData.text, formData.deadlineDate);
        }
    }

    const handleTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => {
            return {...prevState, title: e.target.value};
        })
    }

    const handleTaskText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prevState => {
            return {...prevState, text: e.target.value};
        })
    }

    const handleTaskDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => {
            return {...prevState, deadlineDate: new Date(e.target.value)};
        })
    }

    if (props.isAdding) {
        return (
            <form className="form-add-task" onSubmit={confirmForm}>
                <p className="heading">Create new task:</p>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" onChange={handleTaskTitle}/>
                <label htmlFor="text">Task text</label>
                <textarea id="text" name="text" onChange={handleTaskText}/>
                <label htmlFor="date">Deadline</label>
                <input id="date" name="date" type="date" onChange={handleTaskDate} value={formData.deadlineDate.toLocaleDateString('en-CA')}/>
                <button type="submit">Confirm</button>
            </form>
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