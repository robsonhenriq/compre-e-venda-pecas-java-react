import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';
import { IProduto } from 'app/shared/model/produto.model';

export interface IVeiculo {
  id?: number;
  nome?: string;
  ano?: Moment;
  marcaId?: number;
  listClientes?: ICliente[];
  listProdutos?: IProduto[];
}

export const defaultValue: Readonly<IVeiculo> = {};
