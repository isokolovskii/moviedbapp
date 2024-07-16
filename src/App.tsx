import React from 'react';
import MoviesList from './ui/MoviesList';
import {Provider} from 'react-redux';
import {store} from './store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalProvider} from 'react-native-modalfy';
import {ModalsStack} from './ui/Modals.tsx';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';

dayjs.locale('ru-RU');

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ModalProvider stack={ModalsStack}>
          <MoviesList />
        </ModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
