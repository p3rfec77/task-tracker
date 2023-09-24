import { create } from 'zustand';

interface ColumnState {
    columns: {
        'column-1': IColumn,
    },
}

export interface IColumn {
    id: string,
    title: string,
}

export const useColumns = create<ColumnState>((set) => ({
    columns: {
        "column-1": {
            id: 'column-1',
            title: 'To do',
        }
    },
}));