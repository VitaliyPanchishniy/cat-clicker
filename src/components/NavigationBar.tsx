import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

const NavigationBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentRoute = navigation.getState().routes[navigation.getState().index].name;

  const tabs = [
    { name: 'Counter', label: 'Головна', emoji: '🐱' },
    { name: 'Shop', label: 'Магазин', emoji: '🛍️' },
    { name: 'Inventory', label: 'Інвентар', emoji: '🎒' },
  ];

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => {
        const isActive = tab.name === currentRoute;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name as keyof RootStackParamList)}
          >
            <Text style={styles.icon}>{tab.emoji}</Text>
            <Text style={styles.label}>{tab.label}</Text>
            {isActive && <View style={styles.activeLine} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 12,
  },
  activeLine: {
    marginTop: 4,
    height: 2,
    width: 24,
    backgroundColor: '#f97316',
    borderRadius: 1,
  },
});
