import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';
import { IProduto } from 'app/shared/model/produto.model';

export interface IAvaliacao {
  id?: number;
  dataHora?: Moment;
  descricao?: string;
  listClientes?: ICliente[];
  listProdutos?: IProduto[];
}

export const defaultValue: Readonly<IAvaliacao> = {};
