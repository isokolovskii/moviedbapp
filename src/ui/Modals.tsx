import {createModalStack} from 'react-native-modalfy';
import {MovieDetails} from './components';
import type {Movie} from '../api';

export interface ModalStackParams {
  MovieDetails: {
    movie: Movie;
  };
}

export const ModalsStack = createModalStack(
  {
    MovieDetails,
  },
  {
    backdropOpacity: 0.6,
    position: 'bottom',
  },
);
