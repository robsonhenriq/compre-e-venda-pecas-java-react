import { IProduto } from 'app/shared/model/produto.model';
import { ICarrinho } from 'app/shared/model/carrinho.model';
import { IVenda } from 'app/shared/model/venda.model';

export interface IItem {
  id?: number;
  valorTotal?: number;
  valorItem?: number;
  quantidade?: number;
  produto?: IProduto;
  // listCarrinhos?: ICarrinho[];
  venda?: IVenda;
  carrinho?: ICarrinho;
}

export const defaultValue: Readonly<IItem> = {};
