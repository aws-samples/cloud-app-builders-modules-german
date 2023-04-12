import TodoItem from "../models/TodoItem";

export default class TodoRepository {

    private BASE_PATH = '/api/v1/';
    private jsonHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    constructor() {
        const sessionPathOverride = sessionStorage.getItem("apiBase");
        if (sessionPathOverride) {
            this.BASE_PATH = sessionPathOverride;
            console.log("Using session path override: " + this.BASE_PATH);
        }
    }

    private async makeRequest<T>(path: string, signal: AbortSignal, errorMessage: string, init?: RequestInit): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fetch(this.BASE_PATH + path, { ...{ signal: signal }, ...init }).then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(Error(errorMessage));
                }
            })
                .catch(reject);
        });

    }

    async load(signal: AbortSignal): Promise<TodoItem[]> {
        return this.makeRequest<TodoItem[]>('todos', signal, "Could not load your todo's.");
    }



    async createTodo(todo: TodoItem, signal: AbortSignal): Promise<TodoItem> {
        const body = JSON.stringify(todo);
        const init: RequestInit = { method: 'POST', body: body, headers: this.jsonHeaders };
        return this.makeRequest<TodoItem>('todos', signal, `Error creating todo ${todo.title}`, init);
    }

    async deleteTodo(todoToDelete: TodoItem, signal: AbortSignal): Promise<void> {
        const init: RequestInit = { method: 'DELETE' };
        return this.makeRequest<void>(`todos/${todoToDelete.id}`, signal, `Error deleting todo ${todoToDelete.title}`, init);

    }

    async updateTodo(todoToUpdate: TodoItem, signal: AbortSignal): Promise<void> {
        const body = JSON.stringify(todoToUpdate);
        const init: RequestInit = { method: 'PUT', body: body, headers: this.jsonHeaders };
        return this.makeRequest<void>(`todos/${todoToUpdate.id}`, signal, `Error updating todo ${todoToUpdate.title}`, init);
    }



}