export type Boards = Board[];

export interface Board {
    id: string;
    name: string;
    columns: Column[];
}

export interface Column {
    name: string;
    tasks: Task[];
}

export interface Task {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
}

export enum Status {
    Doing = "Doing",
    Done = "Done",
    Empty = "",
    Todo = "Todo",
}

export interface Subtask {
    title: string;
    isCompleted: boolean;
}
