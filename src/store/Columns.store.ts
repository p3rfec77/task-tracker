import { create } from 'zustand';

interface ColumnState {
    columns: IColumn[],
}

interface IColumn {
    id: string,
    title: string,
    taskIds: string[]
}

export const useColumns = create<ColumnState>((set) => ({
    columns: [
        { id: 'column-1', title: 'To do', taskIds: ['1', '2', '3', '4'] },
    ],
}));