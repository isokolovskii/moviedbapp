import {type Movie, MOVIES_API_ENDPOINTS} from '../../api';
import type {Reducer} from 'redux';
import type {MoviesAction} from '../actions';

interface MoviesState {
  loading: boolean;
  fetchingMore: boolean;
  refreshing: boolean;
  page: number;
  data: Movie[];
  error: string | null;
  listType: keyof typeof MOVIES_API_ENDPOINTS;
}

const initialState: MoviesState = {
  loading: false,
  fetchingMore: false,
  refreshing: false,
  page: 1,
  data: [],
  error: null,
  listType: 'POPULAR',
};

type MoviesReducer = Reducer<MoviesState, MoviesAction>;

const reducer: MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetch_movies':
      return {...state, loading: true, page: 1, error: null};
    case 'refresh_movies':
      return {...state, refreshing: true};
    case 'fetch_more':
      return {...state, fetchingMore: true, page: state.page + 1};
    case 'fetch_success':
      return {
        ...state,
        loading: false,
        refreshing: false,
        fetchingMore: false,
        data: action.payload,
      };
    case 'fetch_error':
      return {
        ...state,
        page: 1,
        loading: false,
        refreshing: false,
        fetchingMore: false,
        error: action.error,
      };
    case 'select_list_type':
      return {...state, listType: action.payload};
    default:
      return state;
  }
};

export default reducer;
