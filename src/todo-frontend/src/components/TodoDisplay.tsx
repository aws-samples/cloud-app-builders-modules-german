import React from "react";
import TodoItem from "../models/TodoItem";

export interface TodoItemProps {
    item: TodoItem
}

const TodoDisplay: React.FunctionComponent<TodoItemProps> = (props) => {
    const { item } = props;

    if (item.completed) {
        return <s>{item.title}</s>;
    } else {
        return <>{item.title}</>
    }
}

export default TodoDisplay;