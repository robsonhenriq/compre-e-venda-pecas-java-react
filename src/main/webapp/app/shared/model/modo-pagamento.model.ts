export const enum TipoPagamento {
  A_VISTA = 'A_VISTA',
  PARCELADO = 'PARCELADO'
}

export interface IModoPagamento {
  id?: number;
  descricao?: string;
  tipoPagamento?: TipoPagamento;
}

export const defaultValue: Readonly<IModoPagamento> = {};
