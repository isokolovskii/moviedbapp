import {ActionType} from '../action-type';
import {
  httpClient,
  type Movie,
  MOVIES_API_ENDPOINTS,
  type MoviesListRequest,
  type PaginatedMoviesResult,
} from '../../api';
import type {MoviesAction} from '../actions';
import type {Dispatch} from 'redux';
import type {RootState} from '../reducers';

export const fetchMovies = () => {
  return async (
    dispatch: Dispatch<MoviesAction>,
    getState: () => RootState,
  ) => {
    dispatch({type: ActionType.FETCH_MOVIES});
    try {
      const response = await httpClient.get<PaginatedMoviesResult>(
        MOVIES_API_ENDPOINTS[getState().movies.listType],
        <MoviesListRequest>{page: 1, language: 'ru-RU'},
      );

      if (response.ok) {
        dispatch({
          type: ActionType.FETCH_SUCCESS,
          payload: response.data?.results || [],
        });
      } else {
        dispatch({type: ActionType.FETCH_ERROR, error: response.problem});
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({type: ActionType.FETCH_ERROR, error: err.message});
      }
    }
  };
};

export const refreshMovies = () => {
  return async (
    dispatch: Dispatch<MoviesAction>,
    getState: () => RootState,
  ) => {
    dispatch({type: ActionType.REFRESH_MOVIES});

    const currentPage = getState().movies.page;
    const result: Movie[] = [];

    for (let i = 1; i <= currentPage; i++) {
      try {
        const response = await httpClient.get<PaginatedMoviesResult>(
          MOVIES_API_ENDPOINTS[getState().movies.listType],
          <MoviesListRequest>{page: i, language: 'ru-RU'},
        );

        if (response.ok) {
          result.push(...(response.data?.results || []));
        } else {
          dispatch({type: ActionType.FETCH_ERROR, error: response.problem});
          return;
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch({type: ActionType.FETCH_ERROR, error: err.message});
          return;
        }
      }
    }

    dispatch({type: ActionType.FETCH_SUCCESS, payload: result});
  };
};

export const fetchMoreMovies = () => {
  return async (
    dispatch: Dispatch<MoviesAction>,
    getState: () => RootState,
  ) => {
    dispatch({type: ActionType.FETCH_MORE});
    const currentPage = getState().movies.page;
    const movies = getState().movies.data;

    try {
      const response = await httpClient.get<PaginatedMoviesResult>(
        MOVIES_API_ENDPOINTS[getState().movies.listType],
        <MoviesListRequest>{page: currentPage, language: 'ru-RU'},
      );

      if (response.ok) {
        dispatch({
          type: ActionType.FETCH_SUCCESS,
          payload: [...movies, ...(response.data?.results || [])],
        });
      } else {
        dispatch({type: ActionType.FETCH_ERROR, error: response.problem});
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({type: ActionType.FETCH_ERROR, error: err.message});
      }
    }
  };
};

export const selectListType = (listType: keyof typeof MOVIES_API_ENDPOINTS) => {
  return (dispatch: Dispatch<MoviesAction>) => {
    dispatch({type: ActionType.SELECT_LIST_TYPE, payload: listType});
    fetchMovies();
  };
};
