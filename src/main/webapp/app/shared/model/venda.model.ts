import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IModoPagamento } from 'app/shared/model/modo-pagamento.model';
import { IVendedor } from 'app/shared/model/vendedor.model';

export interface IVenda {
  id?: number;
  dataHora?: Moment;
  totalVenda?: number;
  listItens?: IItem[];
  comprador?: ICliente;
  enderecoEntrega?: IEndereco;
  modoPagamento?: IModoPagamento;
  listVendedores?: IVendedor[];
}

export const defaultValue: Readonly<IVenda> = {};
