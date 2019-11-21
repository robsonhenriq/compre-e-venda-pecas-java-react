/**
 * Verifica se uma lista é nulla
 * Caso sim retorna ''
 * @param lista
 */
export const isListNull = lista => {
  if (!lista[0]) {
    return 'Lista Vazia';
  } else {
    return lista;
  }
};

/**
 *  Verifica se um objeto é nulo
 *  caso sim, retorna ''
 * @param marca
 */
export const isObjectNull = marca => {
  if (!marca) {
    return '';
  } else {
    return marca;
  }
};
