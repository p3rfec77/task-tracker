export interface ILsitItem {
  title: string;
  id: number;
  description: string;
}

export interface IColumn {
  id: string;
  title: string;
  listItems: ILsitItem[];
}
