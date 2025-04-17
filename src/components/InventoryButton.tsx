import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function InventoryButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Інвентар</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    padding: 12,
    backgroundColor: '#4caf50',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
