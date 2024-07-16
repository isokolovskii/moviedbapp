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
    if (getState().movies.loading) {
      return;
    }

    console.log('Fetching movies');
    dispatch({type: ActionType.FETCH_MOVIES});
    try {
      const response = await httpClient.get<PaginatedMoviesResult>(
        MOVIES_API_ENDPOINTS[getState().movies.listType],
        <MoviesListRequest>{page: 1, language: 'ru-RU'},
      );
      console.log(
        'Fetched movie',
        response.ok,
        response.problem,
        response.duration,
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
    if (getState().movies.refreshing) {
      return;
    }

    console.log('Refreshing movies');
    dispatch({type: ActionType.REFRESH_MOVIES});

    const currentPage = getState().movies.page;
    const result: Movie[] = [];

    for (let i = 1; i <= currentPage; i++) {
      try {
        const response = await httpClient.get<PaginatedMoviesResult>(
          MOVIES_API_ENDPOINTS[getState().movies.listType],
          <MoviesListRequest>{page: i, language: 'ru-RU'},
        );

        console.log(
          'Fetched movies',
          response.ok,
          response.problem,
          response.duration,
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

    console.log('Refreshed movies');
    dispatch({type: ActionType.FETCH_SUCCESS, payload: result});
  };
};

export const fetchMoreMovies = () => {
  return async (
    dispatch: Dispatch<MoviesAction>,
    getState: () => RootState,
  ) => {
    if (getState().movies.fetchingMore) {
      return;
    }

    console.log('Fetching more movies');
    dispatch({type: ActionType.FETCH_MORE});
    const currentPage = getState().movies.page;
    const movies = getState().movies.data;
    console.log('Current page', currentPage);

    try {
      const response = await httpClient.get<PaginatedMoviesResult>(
        MOVIES_API_ENDPOINTS[getState().movies.listType],
        <MoviesListRequest>{page: currentPage, language: 'ru-RU'},
      );

      console.log(
        'Fetched movies',
        response.ok,
        response.problem,
        response.duration,
      );

      if (response.ok) {
        // API may return same movies on different pages, have to filter them out
        const appendedMovies = [...movies, ...(response.data?.results || [])];
        const uniqueMovies = appendedMovies.filter(
          (movie, index, self) =>
            index === self.findIndex(m => m.id === movie.id),
        );
        console.log('Current movies', movies.length);
        console.log('Appended movies', appendedMovies.length);
        console.log('Unique movies', uniqueMovies.length);

        dispatch({
          type: ActionType.FETCH_SUCCESS,
          payload: uniqueMovies,
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
    console.log('Changed list type', listType);
    dispatch({type: ActionType.SELECT_LIST_TYPE, payload: listType});
    fetchMovies();
  };
};
