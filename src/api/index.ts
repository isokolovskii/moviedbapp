import {create} from 'apisauce';
import {TMDB_API_KEY, TMDB_API_URL} from '../config';

export const MOVIES_API_ENDPOINTS = {
  POPULAR: 'movie/popular',
  TOP_RATED: 'movie/top_rated',
} as const;

export const httpClient = create({
  baseURL: TMDB_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export type * from './types';
