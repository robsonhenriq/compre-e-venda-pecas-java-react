import { IItem } from 'app/shared/model/item.model';

export interface ICarrinho {
  id?: number;
  totalCarrinho?: number;
  listItens?: IItem[];
}

export const defaultValue: Readonly<ICarrinho> = {};
