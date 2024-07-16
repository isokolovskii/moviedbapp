import {combineReducers} from 'redux';
import moviesReducer from './moviesReducer';

const reducers = combineReducers({
  movies: moviesReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
