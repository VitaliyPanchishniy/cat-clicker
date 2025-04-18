import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CounterScreen from '../screens/CounterScreen';
import ShopScreen from '../screens/ShopScreen';
import InventoryScreen from '../screens/InventoryScreen';

export type RootStackParamList = {
  Counter: undefined;
  Shop: undefined;
  Inventory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Counter" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Counter" component={CounterScreen} />
    <Stack.Screen name="Shop" component={ShopScreen} />
    <Stack.Screen name="Inventory" component={InventoryScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
