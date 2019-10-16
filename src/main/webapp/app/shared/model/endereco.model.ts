import { ICliente } from 'app/shared/model/cliente.model';

export const enum Estado {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO'
}

export interface IEndereco {
  id?: number;
  rua?: string;
  bairro?: string;
  complemento?: string;
  numero?: number;
  cidade?: string;
  cep?: string;
  estado?: Estado;
  listEnderecos?: ICliente[];
}

export const defaultValue: Readonly<IEndereco> = {};
