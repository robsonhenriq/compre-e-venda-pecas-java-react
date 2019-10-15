export interface IItem {
  id?: number;
  valorTotal?: number;
  valorItem?: number;
  quantidade?: number;
  produtoId?: number;
  vendaId?: number;
}

export const defaultValue: Readonly<IItem> = {};
