import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVendedor, defaultValue } from 'app/shared/model/vendedor.model';

export const ACTION_TYPES = {
  FETCH_VENDEDOR_LIST: 'vendedor/FETCH_VENDEDOR_LIST',
  FETCH_VENDEDOR: 'vendedor/FETCH_VENDEDOR',
  CREATE_VENDEDOR: 'vendedor/CREATE_VENDEDOR',
  UPDATE_VENDEDOR: 'vendedor/UPDATE_VENDEDOR',
  DELETE_VENDEDOR: 'vendedor/DELETE_VENDEDOR',
  RESET: 'vendedor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVendedor>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VendedorState = Readonly<typeof initialState>;

// Reducer

export default (state: VendedorState = initialState, action): VendedorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VENDEDOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VENDEDOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VENDEDOR):
    case REQUEST(ACTION_TYPES.UPDATE_VENDEDOR):
    case REQUEST(ACTION_TYPES.DELETE_VENDEDOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VENDEDOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VENDEDOR):
    case FAILURE(ACTION_TYPES.CREATE_VENDEDOR):
    case FAILURE(ACTION_TYPES.UPDATE_VENDEDOR):
    case FAILURE(ACTION_TYPES.DELETE_VENDEDOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDEDOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENDEDOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VENDEDOR):
    case SUCCESS(ACTION_TYPES.UPDATE_VENDEDOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VENDEDOR):
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

const apiUrl = 'api/vendedors';

// Actions

export const getEntities: ICrudGetAllAction<IVendedor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VENDEDOR_LIST,
    payload: axios.get<IVendedor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVendedor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VENDEDOR,
    payload: axios.get<IVendedor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVendedor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VENDEDOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVendedor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VENDEDOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVendedor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VENDEDOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
