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
    changeOrder: (draggableId: string, sourceIndex: number, sourceId: string, destinationIndex: number) => void;
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
        }
    ],
    changeOrder: (draggableId, sourceIndex, sourceId, destinationIndex) => set(state => {
        const currentColumn = state.columns.find(column => sourceId === column.id) as IColumn;
        const currentItem = currentColumn.listItems.find(item => item.id === +draggableId) as ILsitItem;
        console.log(currentColumn);

        const newListItems: ILsitItem[] = [...currentColumn.listItems];
        const newColumns = [...state.columns];

        newListItems.splice(sourceIndex, 1);
        newListItems.splice(destinationIndex, 0, currentItem);
        currentColumn.listItems = newListItems;
        newColumns.splice(state.columns.indexOf(currentColumn), 1, currentColumn);

        return { columns: newColumns };
    })
}));