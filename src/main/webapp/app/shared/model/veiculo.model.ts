import { Moment } from 'moment';

export interface IVeiculo {
  id?: number;
  nome?: string;
  ano?: Moment;
  marcaId?: number;
}

export const defaultValue: Readonly<IVeiculo> = {};
