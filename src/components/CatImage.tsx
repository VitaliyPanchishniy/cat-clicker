import React from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
  url: string;
  width?: number;
  height?: number;
};

const CatImage = ({ url, width = 250, height = 250 }: Props) => {
  return (
    <Image
      source={{ uri: url }}
      style={[styles.image, { width, height }]}
      resizeMode="cover"
    />
  );
};

export default CatImage;

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
  },
});
