import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CounterScreen from '../screens/CounterScreen';
import ShopScreen from '../screens/ShopScreen';

export type RootStackParamList = {
    Counter: undefined;
    Shop: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Counter" component={CounterScreen} />
            <Stack.Screen name="Shop" component={ShopScreen} />
        </Stack.Navigator>
    );
}
