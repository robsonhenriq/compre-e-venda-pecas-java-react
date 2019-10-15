import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVeiculo, defaultValue } from 'app/shared/model/veiculo.model';

export const ACTION_TYPES = {
  FETCH_VEICULO_LIST: 'veiculo/FETCH_VEICULO_LIST',
  FETCH_VEICULO: 'veiculo/FETCH_VEICULO',
  CREATE_VEICULO: 'veiculo/CREATE_VEICULO',
  UPDATE_VEICULO: 'veiculo/UPDATE_VEICULO',
  DELETE_VEICULO: 'veiculo/DELETE_VEICULO',
  RESET: 'veiculo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVeiculo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VeiculoState = Readonly<typeof initialState>;

// Reducer

export default (state: VeiculoState = initialState, action): VeiculoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEICULO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEICULO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VEICULO):
    case REQUEST(ACTION_TYPES.UPDATE_VEICULO):
    case REQUEST(ACTION_TYPES.DELETE_VEICULO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VEICULO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEICULO):
    case FAILURE(ACTION_TYPES.CREATE_VEICULO):
    case FAILURE(ACTION_TYPES.UPDATE_VEICULO):
    case FAILURE(ACTION_TYPES.DELETE_VEICULO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEICULO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEICULO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEICULO):
    case SUCCESS(ACTION_TYPES.UPDATE_VEICULO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEICULO):
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

const apiUrl = 'api/veiculos';

// Actions

export const getEntities: ICrudGetAllAction<IVeiculo> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VEICULO_LIST,
    payload: axios.get<IVeiculo>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVeiculo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEICULO,
    payload: axios.get<IVeiculo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVeiculo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEICULO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVeiculo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEICULO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVeiculo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEICULO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
