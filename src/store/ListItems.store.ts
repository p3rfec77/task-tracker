import { create } from 'zustand';
import { persist } from 'zustand/middleware'

import nextId from 'react-id-generator';

export interface ILsitItem {
    title: string,
    id: number
}

export interface IColumn {
    id: string,
    title: string,
    listItems: ILsitItem[]
}

interface ListItemsState {
    columns: IColumn[];
    changeOrder: (draggableId: string, sourceIndex: number, sourceId: string, destinationIndex: number, destinationId: string) => void;
    addTask: (id: string, title: string) => void;
    deleteTask: (columnId: string, taskId: number) => void;
}

export const useListItems = create<ListItemsState>()(
    persist(
        (set) => ({
            columns: [
                {
                    id: 'column-1', title: 'to do', listItems: []
                },
                {
                    id: 'column-2', title: 'in progress', listItems: []
                },
                {
                    id: 'column-3', title: 'complete', listItems: []
                }
            ],
            changeOrder: (draggableId, sourceIndex, sourceId, destinationIndex, destinationId) => set(state => {
                const startColumn = state.columns.find(column => sourceId === column.id) as IColumn;
                const dropColumn = state.columns.find(column => destinationId === column.id) as IColumn;
                const currentItem = startColumn.listItems.find(item => item.id === +draggableId) as ILsitItem;

                const startList: ILsitItem[] = [...startColumn.listItems];
                const dropList: ILsitItem[] = [...dropColumn.listItems];

                const newColumns = [...state.columns];

                startList.splice(sourceIndex, 1);
                if (startColumn === dropColumn) {
                    startList.splice(destinationIndex, 0, currentItem);
                    startColumn.listItems = startList;
                    newColumns.splice(state.columns.indexOf(startColumn), 1, startColumn);
                    return { columns: newColumns };
                } else {
                    dropList.splice(destinationIndex, 0, currentItem);
                    dropColumn.listItems = dropList;
                    newColumns.map(column => {
                        if (column.id === sourceId) {
                            return { ...column.listItems = startList }
                        } else if (column.id === destinationId) {
                            return { ...column.listItems = dropList }
                        } else return column
                    })
                    return { columns: newColumns };
                }
            }),

            addTask: (id, title) => set((state) => {
                const columnForAdd = state.columns.find(column => column.id === id);
                if (!columnForAdd) {
                    return { columns: state.columns }
                }

                const [, taskId] = nextId().split('id');

                const updatedListItems = [...columnForAdd.listItems, { title: title, id: +taskId }];

                const updatedColumns = state.columns.map(column => {
                    if (column.id === columnForAdd.id) {
                        return { ...column, listItems: updatedListItems };
                    } else {
                        return column;
                    }
                })

                return { columns: updatedColumns };
            }),
            deleteTask: (columnId, taskId) => set(state => {
                const columnFromDelete = state.columns.find(column => column.id === columnId);
                if (!columnFromDelete) {
                    return { columns: state.columns }
                }

                const updatedListItems = columnFromDelete?.listItems.filter(task => task.id !== taskId);

                const updatedColumns = state.columns.map(column => {
                    if (column.id === columnFromDelete.id) {
                        return { ...column, listItems: updatedListItems };
                    } else {
                        return column;
                    }
                })
                return { columns: updatedColumns };
            })
        }),
        { name: 'listItems' }
    ));