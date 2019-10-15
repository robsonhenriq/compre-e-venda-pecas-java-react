import { Moment } from 'moment';
import { IProduto } from 'app/shared/model/produto.model';

export interface IVendedor {
  id?: number;
  ehEmpresa?: boolean;
  razaoSocial?: string;
  cnpj?: string;
  cpf?: string;
  dataCadastro?: Moment;
  dataNascimento?: Moment;
  descricao?: string;
  usuarioId?: number;
  enderecoId?: number;
  listProdutos?: IProduto[];
}

export const defaultValue: Readonly<IVendedor> = {
  ehEmpresa: false
};
