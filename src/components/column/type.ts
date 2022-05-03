export type TaskItem = {
    columnId: number,
    id: number,
    title: string,
    text: string,
    deadlineDate: Date,
    order: number
}

export type EditTask = {
    id: number,
    title: string,
    text: string,
    deadlineDate: Date
}
