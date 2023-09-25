import { create } from 'zustand';

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
}

export const useListItems = create<ListItemsState>(set => ({
    columns: [
        {
            id: 'column-1', title: 'column', listItems: [
                { title: 'yoooo', id: 1 },
                { title: 'keeeeek', id: 2 },
                { title: 'smek', id: 3 },
                { title: 'flex', id: 4 }
            ]
        },
        {
            id: 'column-2', title: 'column', listItems: [
                { title: 'apple', id: 5 },
                { title: 'orange', id: 6 },
                { title: 'banana', id: 7 },
                { title: 'tomato', id: 8 }
            ]
        },
        {
            id: 'column-3', title: 'column', listItems: [
                { title: 'dota 2', id: 9 },
                { title: 'cs go', id: 10 },
                { title: 'apex', id: 11 },
                { title: 'fortnite', id: 12 }
            ]
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
            console.log(startList);
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
    })
}));