import { IProduto } from 'app/shared/model/produto.model';

export interface IFoto {
  id?: number;
  nome?: string;
  imagemContentType?: string;
  imagem?: any;
  listProdutos?: IProduto[];
}

export const defaultValue: Readonly<IFoto> = {};
