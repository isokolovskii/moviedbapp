import React from 'react';
import MoviesList from './ui/MoviesList';
import {Provider} from 'react-redux';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <MoviesList />
    </Provider>
  );
};

export default App;
