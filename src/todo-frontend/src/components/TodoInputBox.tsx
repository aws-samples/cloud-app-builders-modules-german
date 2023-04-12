import { Container, Header } from '@cloudscape-design/components';
import React, { useState } from 'react';
import TodoItem from '../models/TodoItem';
import TodoInput from './TodoInput';

export interface TodoInputBoxProps {
    numCompletedTodos: number;
    numTodos: number;
    onNewTodoAdded: (newTodo: TodoItem) => Promise<void>;

}

const TodoInputBox: React.FunctionComponent<TodoInputBoxProps> = (props) => {

    const { numCompletedTodos, numTodos, onNewTodoAdded } = props;
    const [newTodo, setNewTodo] = useState<TodoItem>({
        id: 0,
        title: "",
        completed: false,
        user_id: "user"
    });


    const handleNewTodoAdded = async () => {
        onNewTodoAdded(newTodo)
            .then(() => {
                setNewTodo({
                    id: 0,
                    title: "",
                    completed: false,
                    user_id: "user"
                })
            })


    }

    return (
        <Container
            header={
                <Header
                    counter={
                        `(${numCompletedTodos}/${numTodos})`
                    }
                    variant="h2"

                >
                    Todos
                </Header>
            }

        >
            <TodoInput todoInput={newTodo} onTodoChanged={(changedTodo) => setNewTodo(changedTodo)} onTodoSave={handleNewTodoAdded} />

        </Container>
    );
}

export default TodoInputBox;