import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screen/Home';
import Edit from '../Screen/Edit';
import Update from '../Screen/Update';
import Login from '../Screen/Login';
import Splash from '../Screen/Splash';
import Signup from '../Screen/Signup';

export type RootStackParamList = {
  Dashboard: undefined;
  Update: {
    itemId: number;
    taskName: string;
    taskDescription: string;
    createdOn: string;
    tags: string;
  };
  Login: undefined;
  Signup: undefined;
  HotelAdminDashboard: undefined;
  LocationTracker: undefined;
  Apicall: undefined;
  PostApi: undefined;
  Home: undefined;
  Edit: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const NavStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerTitle: 'ADD TASK',
            headerStyle: {backgroundColor: '#4D869C'},
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerShown: true,
            headerTitle: 'ADD TASK',
            headerStyle: {backgroundColor: '#4D869C'},
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{
            headerShown: true,
            headerTitle: 'Update TASK',
            headerStyle: {backgroundColor: '#4D869C'},
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavStack;
