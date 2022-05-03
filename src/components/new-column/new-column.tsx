import './new-column.css';
import React, {useState} from "react";

const NewColumn = (props: {
                        isAdding: boolean,
                        clickAddColumn: () => void,
                        confirmNewColumn: (title: string) => void
                    }) => {

    const [formData, setFormData] = useState({title: ''});

    const confirmForm = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (formData.title.length > 0) {
            props.confirmNewColumn(formData.title);
        }
    }

    const handleColumnTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => {
            return {...prevState, title: e.target.value};
        })
    }

    if (props.isAdding) {
        return (
            <form className="new-column form-new-column" onSubmit={confirmForm}>
                <p className="heading">Create new task:</p>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" onChange={handleColumnTitle}/>
                <button type="submit">Confirm</button>
            </form>
        )
    } else {
        return (
            <div className="new-column">
                <button className="btn-add-new-column" onClick={props.clickAddColumn}>
                    Add new column
                </button>
            </div>
        )
    }
}

export default NewColumn;