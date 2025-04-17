import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CounterScreen from '../screens/CounterScreen';
import ShopScreen from '../screens/ShopScreen';
import InventoryScreen from '../screens/InventoryScreen';

export type RootStackParamList = {
  Counter: undefined;
  Shop: undefined;
  Inventory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Counter">
        <Stack.Screen name="Counter" component={CounterScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
