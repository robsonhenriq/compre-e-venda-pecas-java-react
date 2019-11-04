import { Moment } from 'moment';
import { IMarca } from 'app/shared/model/marca.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IProduto } from 'app/shared/model/produto.model';

export interface IVeiculo {
  id?: number;
  nome?: string;
  ano?: Moment;
  marca?: IMarca;
  listClientes?: ICliente[];
  listProdutos?: IProduto[];
}

export const defaultValue: Readonly<IVeiculo> = {};
