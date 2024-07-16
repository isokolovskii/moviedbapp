export interface Movie {
  id: number;
  backdrop_path: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string; // YYYY-MM-DD
}

export interface PaginatedResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type PaginatedMoviesResult = PaginatedResult<Movie>;

export interface PaginatedRequest {
  page: number;
}

export interface LocalizedRequest {
  language: string;
}

export type MoviesListRequest = PaginatedRequest & LocalizedRequest;
