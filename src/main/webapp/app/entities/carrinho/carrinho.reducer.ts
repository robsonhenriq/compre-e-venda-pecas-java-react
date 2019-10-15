import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICarrinho, defaultValue } from 'app/shared/model/carrinho.model';

export const ACTION_TYPES = {
  FETCH_CARRINHO_LIST: 'carrinho/FETCH_CARRINHO_LIST',
  FETCH_CARRINHO: 'carrinho/FETCH_CARRINHO',
  CREATE_CARRINHO: 'carrinho/CREATE_CARRINHO',
  UPDATE_CARRINHO: 'carrinho/UPDATE_CARRINHO',
  DELETE_CARRINHO: 'carrinho/DELETE_CARRINHO',
  RESET: 'carrinho/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICarrinho>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CarrinhoState = Readonly<typeof initialState>;

// Reducer

export default (state: CarrinhoState = initialState, action): CarrinhoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARRINHO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARRINHO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CARRINHO):
    case REQUEST(ACTION_TYPES.UPDATE_CARRINHO):
    case REQUEST(ACTION_TYPES.DELETE_CARRINHO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CARRINHO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARRINHO):
    case FAILURE(ACTION_TYPES.CREATE_CARRINHO):
    case FAILURE(ACTION_TYPES.UPDATE_CARRINHO):
    case FAILURE(ACTION_TYPES.DELETE_CARRINHO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRINHO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARRINHO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARRINHO):
    case SUCCESS(ACTION_TYPES.UPDATE_CARRINHO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARRINHO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/carrinhos';

// Actions

export const getEntities: ICrudGetAllAction<ICarrinho> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CARRINHO_LIST,
    payload: axios.get<ICarrinho>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICarrinho> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARRINHO,
    payload: axios.get<ICarrinho>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICarrinho> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARRINHO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICarrinho> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARRINHO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICarrinho> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARRINHO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
