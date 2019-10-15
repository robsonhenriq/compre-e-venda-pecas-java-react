import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAvaliacao, defaultValue } from 'app/shared/model/avaliacao.model';

export const ACTION_TYPES = {
  FETCH_AVALIACAO_LIST: 'avaliacao/FETCH_AVALIACAO_LIST',
  FETCH_AVALIACAO: 'avaliacao/FETCH_AVALIACAO',
  CREATE_AVALIACAO: 'avaliacao/CREATE_AVALIACAO',
  UPDATE_AVALIACAO: 'avaliacao/UPDATE_AVALIACAO',
  DELETE_AVALIACAO: 'avaliacao/DELETE_AVALIACAO',
  RESET: 'avaliacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAvaliacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AvaliacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: AvaliacaoState = initialState, action): AvaliacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AVALIACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AVALIACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AVALIACAO):
    case REQUEST(ACTION_TYPES.UPDATE_AVALIACAO):
    case REQUEST(ACTION_TYPES.DELETE_AVALIACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AVALIACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AVALIACAO):
    case FAILURE(ACTION_TYPES.CREATE_AVALIACAO):
    case FAILURE(ACTION_TYPES.UPDATE_AVALIACAO):
    case FAILURE(ACTION_TYPES.DELETE_AVALIACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVALIACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVALIACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AVALIACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_AVALIACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AVALIACAO):
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

const apiUrl = 'api/avaliacaos';

// Actions

export const getEntities: ICrudGetAllAction<IAvaliacao> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AVALIACAO_LIST,
    payload: axios.get<IAvaliacao>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IAvaliacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AVALIACAO,
    payload: axios.get<IAvaliacao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAvaliacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AVALIACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAvaliacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AVALIACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAvaliacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AVALIACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
