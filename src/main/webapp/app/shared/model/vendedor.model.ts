import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IProduto } from 'app/shared/model/produto.model';
import { IVenda } from 'app/shared/model/venda.model';

export interface IVendedor {
  id?: number;
  ehEmpresa?: boolean;
  razaoSocial?: string;
  cnpj?: string;
  cpf?: string;
  dataCadastro?: Moment;
  dataNascimento?: Moment;
  descricao?: string;
  usuario?: IUser;
  endereco?: IEndereco;
  listProdutos?: IProduto[];
  listVendas?: IVenda[];
}

export const defaultValue: Readonly<IVendedor> = {
  ehEmpresa: false
};
