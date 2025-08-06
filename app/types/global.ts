export type Boards = {
    boards: Board[]
};

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

export enum TaskStatusColor {
    Todo = '#49C4E5',
    Doing = '#8471F2',
    Done = '#67E2AE'
}
