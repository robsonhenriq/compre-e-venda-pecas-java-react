import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVenda, defaultValue } from 'app/shared/model/venda.model';

export const ACTION_TYPES = {
  FETCH_VENDA_LIST: 'venda/FETCH_VENDA_LIST',
  FETCH_VENDA: 'venda/FETCH_VENDA',
  CREATE_VENDA: 'venda/CREATE_VENDA',
  UPDATE_VENDA: 'venda/UPDATE_VENDA',
  DELETE_VENDA: 'venda/DELETE_VENDA',
  RESET: 'venda/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVenda>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VendaState = Readonly<typeof initialState>;

// Reducer

export default (state: VendaState = initialState, action): VendaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VENDA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VENDA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VENDA):
    case REQUEST(ACTION_TYPES.UPDATE_VENDA):
    case REQUEST(ACTION_TYPES.DELETE_VENDA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VENDA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VENDA):
    case FAILURE(ACTION_TYPES.CREATE_VENDA):
    case FAILURE(ACTION_TYPES.UPDATE_VENDA):
    case FAILURE(ACTION_TYPES.DELETE_VENDA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VENDA):
    case SUCCESS(ACTION_TYPES.UPDATE_VENDA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VENDA):
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

const apiUrl = 'api/vendas';

// Actions

export const getEntities: ICrudGetAllAction<IVenda> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VENDA_LIST,
    payload: axios.get<IVenda>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVenda> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VENDA,
    payload: axios.get<IVenda>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVenda> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VENDA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVenda> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VENDA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVenda> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VENDA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
