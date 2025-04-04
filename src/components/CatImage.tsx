import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  uri: string;
}

export default function CatImage({ uri }: Props) {
  return <Image source={{ uri }} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});
