export interface IFoto {
  id?: number;
  nome?: string;
  imagemContentType?: string;
  imagem?: any;
}

export const defaultValue: Readonly<IFoto> = {};
