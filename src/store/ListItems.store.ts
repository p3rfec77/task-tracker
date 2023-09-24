import { create } from 'zustand';

export interface ILsitItem {
    title: string,
    id: number
}

interface ListItemsState {
    listItems: ILsitItem[];
    changeOrder: (draggableId: string, source: number, destination: number) => void;
}

export const useListItems = create<ListItemsState>(set => ({
    listItems: [
        { title: 'yoooo', id: 1 },
        { title: 'keeeeek', id: 2 },
        { title: 'smek', id: 3 },
        { title: 'flex', id: 4 }
    ],
    changeOrder: (draggableId, source, destination) => set(state => {
        const newListItems: ILsitItem[] = [...state.listItems];
        const currentItem = state.listItems.find(item => item.id === +draggableId) as ILsitItem;
        newListItems.splice(source, 1);
        newListItems.splice(destination, 0, currentItem);
        return { listItems: newListItems };
    })
}));