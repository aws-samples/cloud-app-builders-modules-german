import { Table, Input, Button, Box, Header, NonCancelableCustomEvent, TableProps } from '@cloudscape-design/components';
import { ClickDetail } from '@cloudscape-design/components/internal/events';
import React from 'react';
import TodoItem from '../models/TodoItem';
import Footer from './Footer';
import TodoDisplay from './TodoDisplay';


export interface TodoTableProps {
    onSelectionChange: (event: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<TodoItem>>) => Promise<void>;
    onTodoDeleted: (event: CustomEvent<ClickDetail>, itemToDelete: TodoItem) => Promise<void>;
    onSubmitEdit: TableProps.SubmitEditFunction<TodoItem>;
    todos: TodoItem[];
}
const TodoTable: React.FunctionComponent<TodoTableProps> = (props) => {

    const { onSelectionChange, onTodoDeleted, onSubmitEdit, todos } = props;

    return (

        <Table
            onSelectionChange={onSelectionChange}
            selectedItems={todos.filter(todo => todo.completed)}
            /*ariaLabels={{
              selectionGroupLabel: "Items selection",
              allItemsSelectionLabel: ({ selectedItems }) =>
                `${selectedItems.length} ${
                  selectedItems.length === 1 ? "item" : "items"
                } selected`,
              itemSelectionLabel: ({ selectedItems }, item) => {
                const isItemSelected = selectedItems.filter(
                  i => i.title === item.title
                ).length;
                return `${item.title} is ${
                  isItemSelected ? "" : "not"
                } selected`;
              }
            }}*/
            columnDefinitions={[
                {
                    id: "title",
                    header: "Title",
                    cell: e => <TodoDisplay item={e} />,
                    sortingField: "title",
                    editConfig: {
                        ariaLabel: "Title",
                        editIconAriaLabel: "editable",
                        errorIconAriaLabel: "Todo Title Error",
                        editingCell: (
                            item,
                            { currentValue, setValue }
                        ) => {
                            return (
                                <Input
                                    autoFocus={true}
                                    value={currentValue ?? item.title}
                                    onChange={event =>
                                        setValue(event.detail.value)
                                    }
                                />
                            );
                        }
                    }

                },
                {
                    id: "delete",
                    header: "",
                    cell: e => <Button onClick={(ev) => onTodoDeleted(ev, e)} iconName="close" variant="icon" />,
                    minWidth: 64,
                    width: 64,
                }
            ]}
            items={todos}
            loadingText="Loading todos"
            selectionType="multi"
            variant="container"
            trackBy="id"
            visibleColumns={[
                "title",
                "delete"
            ]}
            empty={
                <Box textAlign="center" color="inherit">
                    <b>Nothing to do.</b>
                    <Box
                        padding={{ bottom: "s" }}
                        variant="p"
                        color="inherit"
                    >
                        Pat yourself on the back, you are all caught up.
                    </Box>
                </Box>
            }
            header={
                <Header

                >
                </Header>
            }

            footer={
                <Footer />
            }

            submitEdit={onSubmitEdit}



        />
    );
}

export default TodoTable;