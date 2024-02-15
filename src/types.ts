export interface ILsitItem {
  title: string;
  id: number;
}

export interface IColumn {
  id: string;
  title: string;
  listItems: ILsitItem[];
}
