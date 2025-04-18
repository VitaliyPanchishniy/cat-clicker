import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Cat } from '../services/api/types';

interface Props {
  cat: Cat;
  onPress: () => void;
}

const ShopButton: React.FC<Props> = ({ cat, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image source={{ uri: cat.url }} style={styles.image} />
    <Text style={styles.price}>💰 {cat.price}</Text>
  </TouchableOpacity>
);

export default ShopButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
  },
});
