import { ICarrinho } from 'app/shared/model/carrinho.model';

export interface IItem {
  id?: number;
  valorTotal?: number;
  valorItem?: number;
  quantidade?: number;
  produtoId?: number;
  listCarrinhos?: ICarrinho[];
  vendaId?: number;
}

export const defaultValue: Readonly<IItem> = {};
