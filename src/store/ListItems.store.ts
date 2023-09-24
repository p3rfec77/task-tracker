import { create } from 'zustand';

export interface ILsitItem {
    title: string,
    id: number
}

interface ListItemsState {
    listItems: ILsitItem[];
}

export const useListItems = create<ListItemsState>(set => ({
    listItems: [
        { title: 'yoooo', id: 1 },
        { title: 'keeeeek', id: 2 },
        { title: 'smek', id: 3 },
        { title: 'flex', id: 4 }
    ]
}));