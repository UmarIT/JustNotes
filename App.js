// In App.js in a new project

import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigation';
import {persistor, store} from './src/redux/store/';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainStack />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
