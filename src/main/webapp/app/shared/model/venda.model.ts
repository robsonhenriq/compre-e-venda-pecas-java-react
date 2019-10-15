import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';
import { IVendedor } from 'app/shared/model/vendedor.model';

export interface IVenda {
  id?: number;
  dataHora?: Moment;
  totalVenda?: number;
  listItens?: IItem[];
  compradorId?: number;
  enderecoEntregaId?: number;
  modoPagamentoId?: number;
  listVendedores?: IVendedor[];
}

export const defaultValue: Readonly<IVenda> = {};
