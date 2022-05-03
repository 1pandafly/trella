import React from "react";
import EditTask from "./type";

interface MyContext {
    deleteTask: (taskId: number) => void,
    openModal: (task: EditTask) => void,
}

const TableContext = React.createContext({} as MyContext);

export default TableContext;