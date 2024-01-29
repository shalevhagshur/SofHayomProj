import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import NavigatorSelector from './src/NavigatorSelector';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigatorSelector />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
