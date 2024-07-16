# MovieDB

# О проекте

Данный проект является примером использования RN для отображения списков. 

- Для работы с сетью используется библиотека apisauce, которая в свою очередь является более удобной оберткой над axios.
- Для построения логики приложения используется Redux и миддлвара Redux Thunk. Вся логика работы с сетевыми запросами
вынесена в отдельные action creators, которые в свою очередь вызываются из компонентов.
- Для UI использована библиотека FlashList в качестве более шустрой альтернативы классическому FlatList. Для 
работы с изображениями используется FastImage.
- Для отображения модального окна используется библиотека react-native-modalify.
- Для обработки и форматирования дат используется dayjs.

В качестве источника данных используется сервис TMDB. Приложение использует ключ, который для примера
добавлен в проект, но в реальном проекте являлся бы секретным и не должен храниться в репозитории.
*API сервиса TMDB не доступны из РФ, используйте VPN если необходимо.*

Используется запрос популярных фильмов поддерживающий пагинацию. 

Данные загружаются при запуске приложения, хранятся в Redux Store. Во время прокрутки списка подгружаются новые
элементы. Так же список обновляется раз в 30 секунд и его можно принудительно обновить свайпом вниз.

Все состояния процесса загрузки обрабатываются так же в Redux Store - первичная загрузка, рефреш и подгрузка новых данных.
Для удобства пользователя загрузка списка, подгрузка элементов, а так же загрузка картинок отображаются в виде индикаторов.

Ниже приведена часть оригнинальной инструкции из React Native для запуска данного проекта.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
