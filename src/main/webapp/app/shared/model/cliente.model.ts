import { Moment } from 'moment';
import { ICarrinho } from 'app/shared/model/carrinho.model';
import { IUser } from 'app/shared/model/user.model';
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
  carrinho?: ICarrinho;
  usuario?: IUser;
  listVeiculos?: IVeiculo[];
  listEnderecos?: IEndereco[];
  listAvaliacaos?: IAvaliacao[];
}

export const defaultValue: Readonly<ICliente> = {};
