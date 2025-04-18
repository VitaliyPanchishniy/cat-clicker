import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

const InventoryButton = ({ onPress }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>🎒 Інвентар</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default InventoryButton;
