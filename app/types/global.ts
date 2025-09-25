export interface Board {
    boardId: string;
    name: string;
    createdAt: Date;
    columns: Column[];
}

export interface Column {
    id: number;
    name: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    name: string;
    description?: string;
    column_id: number;
    subtasks?: Subtask[];
}

export interface Subtask {
    id: number;
    name: string;
    isComplete: boolean;
    task_id: string;
}

export interface APIError {
    errorName: string;
    message: string;
    code: number;
    errors?: [string][];
}