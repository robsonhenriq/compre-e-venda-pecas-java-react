import { IFoto } from 'app/shared/model/foto.model';
import { IVeiculo } from 'app/shared/model/veiculo.model';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';

export const enum Categoria {
  CARROCERIA = 'CARROCERIA',
  ACESSORIOS = 'ACESSORIOS',
  PNEUS_RODAS = 'PNEUS_RODAS'
}

export interface IProduto {
  id?: number;
  codigoOriginal?: string;
  fabricante?: string;
  descricao?: string;
  ehUsado?: boolean;
  quantidadeDisponivel?: number;
  altura?: number;
  largura?: number;
  pesoBruto?: number;
  precoAVista?: number;
  precoAPrazo?: number;
  categoria?: Categoria;
  marcaId?: number;
  listImagens?: IFoto[];
  aplicacoes?: IVeiculo[];
  listAvaliacaos?: IAvaliacao[];
}

export const defaultValue: Readonly<IProduto> = {
  ehUsado: false
};
