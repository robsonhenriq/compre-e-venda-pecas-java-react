import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IAvaliacao {
  id?: number;
  dataHora?: Moment;
  descricao?: string;
  listClientes?: ICliente[];
}

export const defaultValue: Readonly<IAvaliacao> = {};
