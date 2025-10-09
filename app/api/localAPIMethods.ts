import type { Board, BoardResponse, Task } from "~/types/global";

const STORAGE_KEY = "kanban_boards";
const USER_KEY = "kanban_user";

function getStoredBoards(): Board[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveBoards(boards: Board[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
}

export class LocalAPIMethods {
    static async RegisterUser(requestBody: { username: string; password: string }): Promise<string | undefined> {
        localStorage.setItem(USER_KEY, JSON.stringify(requestBody));
        return requestBody.username;
    }

    static async LoginUser(requestBody: { username: string; password: string }): Promise<string | undefined> {
        const user = localStorage.getItem(USER_KEY);
        if (!user) throw new Error("No user registered");
        const parsed = JSON.parse(user);
        if (parsed.username !== requestBody.username || parsed.password !== requestBody.password) {
            throw new Error("Invalid username or password");
        }
        return parsed.username;
    }

    static async LogoutUser(): Promise<void> {
        // For mock, do nothing or optionally clear user
        return;
    }

    static async GetBoards(): Promise<Board[]> {
        return getStoredBoards();
    }

    static async GetBoardById(boardId: string): Promise<Board> {
        const boards = getStoredBoards();
        const board = boards.find(b => b.boardId === boardId);
        if (!board) throw new Error("Board not found");
        return board;
    }

    static async CreateBoard(requestBody: { name: string; columns: string[] }): Promise<Board> {
        const boards = getStoredBoards();
        const newBoard: Board = {
            boardId: crypto.randomUUID(),
            name: requestBody.name,
            createdAt: new Date(),
            columns: requestBody.columns.map(col => ({
                id: crypto.randomUUID(),
                name: col,
                tasks: [],
            })),
        };
        boards.push(newBoard);
        saveBoards(boards);
        return newBoard;
    }

    static async EditBoard(input: {
        boardId: string;
        requestBody: { name?: string; columns?: ({ name: string } | { name: string; id: string } | { id: string })[] };
    }): Promise<BoardResponse> {
        const boards = getStoredBoards();
        const board = boards.find(b => b.boardId === input.boardId);
        if (!board) throw new Error("Board not found");

        if (input.requestBody.name) board.name = input.requestBody.name;

        if (input.requestBody.columns) {
            // Update or add columns
            input.requestBody.columns.forEach(col => {
                const existing = board.columns.find(c => c.id === (col as any).id);
                if (existing) {
                    if ("name" in col) existing.name = col.name;
                } else if ("name" in col) {
                    board.columns.push({ id: crypto.randomUUID(), name: col.name, tasks: [] });
                }
            });
        }

        saveBoards(boards);
        return board;
    }

    static async DeleteBoard(boardId: string): Promise<void> {
        let boards = getStoredBoards();
        boards = boards.filter(b => b.boardId !== boardId);
        saveBoards(boards);
    }

    static async CreateTask(input: {
        boardId: string;
        requestBody: { name: string; description?: string; status: string; subtasks: string[] };
    }): Promise<Task> {
        const { boardId, requestBody } = input;
        const boards = getStoredBoards();
        const board = boards.find(b => b.boardId === boardId);
        if (!board) throw new Error("Board not found");

        const column = board.columns.find(c => c.id === requestBody.status);
        if (!column) throw new Error("Column not found");

        const newTask: Task = {
            id: crypto.randomUUID(),
            name: requestBody.name,
            description: requestBody.description,
            column_id: column.id,
            subtasks: requestBody.subtasks.map(name => ({
                id: crypto.randomUUID(),
                name,
                isComplete: false,
                task_id: "", // assigned below
            })),
        };
        newTask.subtasks?.forEach(st => (st.task_id = newTask.id));

        column.tasks.push(newTask);
        saveBoards(boards);
        return newTask;
    }

    static async EditTask(input: {
        boardId: string;
        taskId: string;
        requestBody: {
            name?: string;
            description?: string;
            status?: string;
            subtasks?: ({ name: string } | { name: string; id: string } | { id: string })[];
        };
    }): Promise<Partial<Task>> {
        const { boardId, taskId, requestBody } = input;
        const boards = getStoredBoards();
        const board = boards.find(b => b.boardId === boardId);
        if (!board) throw new Error("Board not found");

        let taskFound: Task | undefined;
        let currentColumn = board.columns.find(c =>
            c.tasks.some(t => t.id === taskId)
        );
        if (currentColumn) taskFound = currentColumn.tasks.find(t => t.id === taskId);

        if (!taskFound) throw new Error("Task not found");

        // Update task fields
        if (requestBody.name) taskFound.name = requestBody.name;
        if (requestBody.description) taskFound.description = requestBody.description;

        // Move task if status changed
        if (requestBody.status && requestBody.status !== currentColumn?.name) {
            const newColumn = board.columns.find(c => c.id === requestBody.status);
            if (!newColumn) throw new Error("New column not found");

            currentColumn!.tasks = currentColumn!.tasks.filter(t => t.id !== taskId);
            newColumn.tasks.push(taskFound);
            taskFound.column_id = newColumn.id;
        }

        // Update subtasks
        if (requestBody.subtasks) {
            const existingSubtasks = taskFound.subtasks ?? [];
            for (const st of requestBody.subtasks) {
                if ("id" in st) {
                    const existing = existingSubtasks.find(s => s.id === st.id);
                    if (existing && "name" in st) existing.name = st.name;
                } else if ("name" in st) {
                    existingSubtasks.push({
                        id: crypto.randomUUID(),
                        name: st.name,
                        isComplete: false,
                        task_id: taskFound.id,
                    });
                }
            }
            taskFound.subtasks = existingSubtasks;
        }

        saveBoards(boards);
        return taskFound;
    }

    static async DeleteTask(boardId: string, taskId: string): Promise<void> {
        const boards = getStoredBoards();
        const board = boards.find(b => b.boardId === boardId);
        if (!board) throw new Error("Board not found");

        board.columns.forEach(c => {
            c.tasks = c.tasks.filter(t => t.id !== taskId);
        });

        saveBoards(boards);
    }

    static async updateSubtaskStatus(input: {
        boardId: string;
        taskId: string;
        requestBody: { subtaskId: string; isCompleted: boolean };
    }): Promise<void> {
        const { boardId, taskId, requestBody } = input;
        const boards = getStoredBoards();
        const board = boards.find(b => b.boardId === boardId);
        if (!board) throw new Error("Board not found");

        for (const col of board.columns) {
            const task = col.tasks.find(t => t.id === taskId);
            if (task) {
                const subtask = task.subtasks?.find(st => st.id === requestBody.subtaskId);
                if (subtask) subtask.isComplete = requestBody.isCompleted;
                break;
            }
        }

        saveBoards(boards);
    }
}
