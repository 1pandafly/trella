import './new-column.css';
import React, {useRef} from "react";

const NewColumn = (props: {
                        isAdding: boolean,
                        clickAddColumn: () => void,
                        confirmNewColumn: (title: string) => void
                    }) => {

    const columnTitle = useRef<HTMLInputElement>(null);

    const confirmForm = () => {
        if (columnTitle.current) {
            props.confirmNewColumn(columnTitle.current.value);
        }
    }

    if (props.isAdding) {
        return (
            <div className="new-column form-new-column">
                <p className="heading">Create new task:</p>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" ref={columnTitle}/>
                <button type="button" onClick={confirmForm}>Confirm</button>
            </div>
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