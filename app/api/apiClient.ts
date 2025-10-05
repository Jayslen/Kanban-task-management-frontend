import type { Board, BoardResponse, Task } from "~/types/global";

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const HEADERS_OPTIONS = (input?: Partial<RequestInit>): RequestInit => {
    return { method: input?.method || Method.GET, headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: input?.body }
}

export class APIMethods {
    static async LoginUser(requestBody: { username: string, password: string }): Promise<string | undefined> {
        const response = await fetch(`${API_URL}login`, HEADERS_OPTIONS({ method: Method.POST, body: JSON.stringify(requestBody) }))

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message)
        }

        const user = await response.json() as { username: string }
        return user.username
    }

    static async GetBoards() {
        const response = await fetch(`${API_URL}board`, HEADERS_OPTIONS())

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message)
        }
        return await response.json()
    }

    static async GetBoardById(boardId: string): Promise<Board> {
        const response = await fetch(`${API_URL}board/${boardId}`, HEADERS_OPTIONS())

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message)
        }
        return await response.json() as Board
    }

    static async CreateTask(input: { boardId: string, requestBody: { name: string, description?: string, status: string, subtasks: string[] } }) {
        const { boardId, requestBody } = input
        const response = await fetch(`${API_URL}board/${boardId}/task`, HEADERS_OPTIONS({ method: Method.POST, body: JSON.stringify(requestBody) }))

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message || 'Failed to create task')
        }
        const newTask = await response.json() as Task
        return newTask
    }

    static async EditTask(input: { boardId: string, taskId: string, requestBody: { name?: string, description?: string, status?: string, subtasks?: ({ name: string } | { name: string, id: string } | { id: string })[] } }): Promise<Partial<Task>> {
        const { boardId, taskId, requestBody } = input
        const response = await fetch(`${API_URL}board/${boardId}/task/${taskId}`, HEADERS_OPTIONS({ method: Method.PATCH, body: JSON.stringify(requestBody) }))

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message || 'Failed to edit task')
        }

        const updatedTask = await response.json() as Partial<Task>
        return updatedTask
    }

    static async DeleteTask(boardId: string, taskId: string): Promise<void> {
        const response = await fetch(`${API_URL}board/${boardId}/task/${taskId}`, HEADERS_OPTIONS({ method: Method.DELETE }))

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message)
        }
    }

    static async updateSubtaskStatus(input: { boardId: string, taskId: string, requestBody: { subtaskId: string, isCompleted: boolean } }): Promise<void> {
        const { boardId, taskId, requestBody } = input
        const response = await fetch(`${API_URL}board/${boardId}/task/${taskId}/subtask`, HEADERS_OPTIONS({ method: Method.PATCH, body: JSON.stringify(requestBody) }))

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message)
        }
    }

    static async CreateBoard(requestBody: { name: string, columns: string[] }): Promise<Board> {
        const response = await fetch(`${API_URL}board`, HEADERS_OPTIONS({ method: Method.POST, body: JSON.stringify(requestBody) }))

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message || 'Failed to create board')
        }
        return await response.json() as Board
    }

    static async EditBoard(input: { boardId: string, requestBody: { name?: string, columns?: ({ name: string } | { name: string, id: string } | { id: string })[] } }): Promise<BoardResponse> {
        const { boardId, requestBody } = input
        const response = await fetch(`${API_URL}board/${boardId}`, HEADERS_OPTIONS({ method: Method.PATCH, body: JSON.stringify(requestBody) }))

        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message || 'Failed to edit board')
        }
        return await response.json() as BoardResponse
    }

    static async DeleteBoard(boardId: string): Promise<void> {
        const response = await fetch(`${API_URL}board/${boardId}`, HEADERS_OPTIONS({ method: Method.DELETE }))
        if (!response.ok) {
            const responseError = await response.json()
            throw new Error(responseError.message)
        }
    }
}