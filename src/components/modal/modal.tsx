import ReactModal from "react-modal";
import React, {useEffect, useState} from "react";
import './modal.css';
import EditTask from "./type";

const Modal = (props: {
    modalIsOpen: boolean,
    closeModal: () => void,
    taskInfo: EditTask,
    confirmEditedTask: (editableTask: EditTask) => void
}) => {

    const [editableTask, setEditableTask] = useState({
        id: -1,
        title: '',
        text: '',
        deadlineDate: new Date(),
        isOpen: false
    });

    useEffect(() => {
        setEditableTask(prevState => {
            return {...prevState, ...props.taskInfo}
        });
    }, [props.taskInfo]);

    const handleTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableTask(prevState => {
            return {...prevState, title: e.target.value};
        })

        // console.log(editableTask)
    }

    const handleTaskText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableTask(prevState => {
            return {...prevState, text: e.target.value};
        })
    }

    const handleTaskDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableTask(prevState => {
            return {...prevState, deadlineDate: new Date(e.target.value)};
        })
    }

    const confirmForm = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (editableTask.title && editableTask.text) {
            props.confirmEditedTask({id: editableTask.id, title: editableTask.title, text: editableTask.text, deadlineDate: editableTask.deadlineDate});
        }
    }

    return (
        <ReactModal
            style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '30px 20px 20px 20px'
                    }
                }}
            isOpen={props.modalIsOpen}>

            <div className="modal-body">
                <button className="modal-close-button" onClick={props.closeModal}>X</button>
                <form className="form-add-task" onSubmit={confirmForm}>
                    <p className="heading">Edit task:</p>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" value={editableTask.title} onChange={handleTaskTitle} />
                    <label htmlFor="text">Task text</label>
                    <textarea id="text" name="text" value={editableTask.text} onChange={handleTaskText} />
                    <label htmlFor="date">Deadline</label>
                    <input id="date" name="date" type="date" value={editableTask.deadlineDate.toLocaleDateString('en-CA')} onChange={handleTaskDate}/>
                    <button type="submit">Confirm</button>
                </form>
            </div>

        </ReactModal>
    )
}

export default Modal;