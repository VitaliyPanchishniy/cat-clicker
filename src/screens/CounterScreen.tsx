import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addPoint } from '../store/catsSlice';
import CatImage from '../components/CatImage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

const CounterScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { points, selectedCat } = useAppSelector((state) => state.cats);

  const [fadeAnim] = useState(new Animated.Value(0));

  const handleClick = () => {
    dispatch(addPoint());


    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.points}>CatCoins: {points}</Text>

      <TouchableOpacity onPress={handleClick}>
        {selectedCat ? (
          <CatImage url={selectedCat.url} />
        ) : (
          <Image
            source={{ uri: 'https://cataas.com/cat/says/Click%20me!' }}
            style={styles.defaultCat}
          />
        )}
        <Animated.Text style={[styles.plusOne, { opacity: fadeAnim }]}>+1</Animated.Text>
      </TouchableOpacity>

      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Inventory')} style={styles.button}>
          <Text style={styles.buttonText}>🎒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={styles.button}>
          <Text style={styles.buttonText}>🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CounterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  points: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  defaultCat: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  plusOne: {
    position: 'absolute',
    top: 20,
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  bottomButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#ff8c00',
    padding: 12,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
  },
});
