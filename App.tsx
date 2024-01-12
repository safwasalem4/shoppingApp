import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainerProps} from '@react-navigation/native';
import store from './App/store';
import AppIndex from './App/AppIndex';

const App: React.FC<NavigationContainerProps> = () => {
  return (
    <Provider store={store} children={undefined}>
      <AppIndex />
    </Provider>
  );
};

export default App;
