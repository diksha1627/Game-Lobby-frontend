// MultiplayerGameApp/src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateJoinScreen from '../screens/CreateJoinScreen';
import LobbyScreen from '../screens/LobbyScreen';
import CreateUserScreen from '../screens/CreateUserScreen'

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CreateUser">
    <Stack.Screen name="CreateUser" component={CreateUserScreen} />
      <Stack.Screen name="CreateJoin" component={CreateJoinScreen} />
      <Stack.Screen name="Lobby" component={LobbyScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
