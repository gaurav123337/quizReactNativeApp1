import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home';
import Quiz from './screens/quiz';
import Result from './screens/result';

import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigation/index';

import { Provider } from 'react-redux';

import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
