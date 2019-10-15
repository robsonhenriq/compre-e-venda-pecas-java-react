import { Moment } from 'moment';
import { IVeiculo } from 'app/shared/model/veiculo.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';

export interface ICliente {
  id?: number;
  nome?: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: Moment;
  telefone?: string;
  celular?: string;
  carrinhoId?: number;
  usuarioId?: number;
  listVeiculos?: IVeiculo[];
  listEnderecos?: IEndereco[];
  listAvaliacaos?: IAvaliacao[];
}

export const defaultValue: Readonly<ICliente> = {};
