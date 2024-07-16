import {ActionType} from '../action-type';
import {type Movie, MOVIES_API_ENDPOINTS} from '../../api';

interface FetchMoviesAction {
  type: ActionType.FETCH_MOVIES;
}

interface RefreshMoviesAction {
  type: ActionType.REFRESH_MOVIES;
}

interface FetchSuccessAction {
  type: ActionType.FETCH_SUCCESS;
  payload: Movie[];
}

interface FetchErrorAction {
  type: ActionType.FETCH_ERROR;
  error: string;
}

interface FetchMoreAction {
  type: ActionType.FETCH_MORE;
}

export type MoviesAction =
  | FetchMoviesAction
  | RefreshMoviesAction
  | FetchSuccessAction
  | FetchErrorAction
  | FetchMoreAction;
