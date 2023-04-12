import React, { useEffect, useState } from "react";
import TodoItem from "../models/TodoItem";
import TodoRepository from "../services/TodoRepository";
import { TableProps } from "@cloudscape-design/components/table";
import { NonCancelableCustomEvent, SpaceBetween } from "@cloudscape-design/components";
import { ClickDetail } from "@cloudscape-design/components/internal/events";
import useAsyncWithErrorHandling from "../services/useAsyncWithErrorHandling";
import * as table from '@cloudscape-design/components/table';
import TodoInputBox from "./TodoInputBox";
import TodoTable from "./TodoTable";



const TodoList: React.FunctionComponent = (props) => {

    const [todos, setTodos] = useState<TodoItem[]>([]);



    const asyncHook = useAsyncWithErrorHandling<TodoItem[]>();
    const asyncHookVoid = useAsyncWithErrorHandling<void>();
    const asyncHookTodoItem = useAsyncWithErrorHandling<TodoItem>();



    const todoRepository = new TodoRepository();

    const controller = new AbortController();



    useEffect(() => {
        const signal = controller.signal;
        asyncHook(todoRepository.load(signal)).then(setTodos);
    }, [asyncHook]);

    const handleSelectionChange = async (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<TodoItem>>) => {

        const updatePromises = todos.map(todo => {
            return new Promise<TodoItem>((resolve,) => {
                const shouldBeChecked = event.detail.selectedItems.findIndex(selectedTodo => selectedTodo.id === todo.id) !== -1;
                if (shouldBeChecked !== todo.completed) {
                    todo.completed = !todo.completed;
                    asyncHookVoid(todoRepository.updateTodo(todo, controller.signal))
                        .then(() => resolve(todo))
                        .catch(() => {
                            todo.completed = !todo.completed;
                            resolve(todo);
                        })
                } else {
                    resolve(todo);
                }

            })
        });

        const todosAfterUpdating = await Promise.all(updatePromises);
        setTodos(todosAfterUpdating);



    }

    const handleNewTodoAdded = async (newTodo: TodoItem) => {

        asyncHookTodoItem(todoRepository.createTodo(newTodo, controller.signal))
            .then((response: TodoItem) => {
                setTodos(todos.concat([response]));

            });

    }

    const handleTodoDeleted = async (event: CustomEvent<ClickDetail>, itemToDelete: TodoItem) => {
        asyncHookVoid(todoRepository.deleteTodo(itemToDelete, controller.signal))
            .then(() => {
                console.dir(todos);
                const todosWithoutDeleted = todos.filter(todo => todo.id !== itemToDelete.id)
                setTodos(todosWithoutDeleted);
                console.dir(todosWithoutDeleted);
            });
    }






    const handleSubmitEdit: TableProps.SubmitEditFunction<TodoItem> = async (item: TodoItem,
        column: table.TableProps.ColumnDefinition<TodoItem>,
        newValue: unknown
    ) => {
        return new Promise((resolve, reject) => {


            if (column.id === "title") {
                const newItem: TodoItem = { ...item, ...{ title: newValue } } as TodoItem;

                asyncHookVoid(todoRepository.updateTodo(newItem, controller.signal))
                    .then(() => {
                        const updatedTodos = todos.map(todo => todo.id === newItem.id ? newItem : todo);
                        setTodos(updatedTodos);
                        resolve();
                    });
            }
        })



    };

    const numCompletedTodos = todos.reduce((previousValue: number, currentValue, currentIndex, array) => {
        return currentValue.completed ? previousValue + 1 : previousValue;
    }, 0);


    return (
        <div style={{ paddingTop: '18vh', paddingBottom: '5vh', paddingLeft: '18vw', paddingRight: '18vw', zIndex: 10 }}>
            <SpaceBetween size="xxl">
                <TodoInputBox numCompletedTodos={numCompletedTodos} numTodos={todos.length} onNewTodoAdded={handleNewTodoAdded} />

                <TodoTable todos={todos} onSelectionChange={handleSelectionChange} onTodoDeleted={handleTodoDeleted} onSubmitEdit={handleSubmitEdit} />

            </SpaceBetween>

        </div>
    )
}

export default TodoList;