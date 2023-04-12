import { Input, InputProps } from "@cloudscape-design/components";
import { BaseKeyDetail, NonCancelableCustomEvent } from "@cloudscape-design/components/internal/events";
import React from "react";
import TodoItem from "../models/TodoItem";

const ENTER_KEY = 13;

export interface TodoInputProps {
    onTodoSave: (changedTodo: TodoItem) => void,
    onTodoChanged: (changedTodo: TodoItem) => void,
    todoInput: TodoItem
}

const TodoInput: React.FunctionComponent<TodoInputProps> = (props) => {

    const { onTodoSave, todoInput, onTodoChanged } = props;

    const handleEnterKey = async (keyEvent: CustomEvent<BaseKeyDetail>) => {
        if (keyEvent.detail.keyCode === ENTER_KEY) {
            keyEvent.preventDefault();
            onTodoSave(todoInput);

        }
    }

    const handleTodoChange = (event: NonCancelableCustomEvent<InputProps.ChangeDetail>) => {
        onTodoChanged({
            ...todoInput,
            id: todoInput.id,
            title: event.detail.value

        })
    }

    return (
        <Input

            placeholder="What needs to be done?"
            inputMode="text"
            autoFocus={true}
            onChange={handleTodoChange}
            value={todoInput.title}
            onKeyUp={handleEnterKey}
        />
    )
}

export default TodoInput;