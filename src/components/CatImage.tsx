import React from 'react';
import { Image, StyleSheet } from 'react-native';

type Cat = {
  id: string;
  url: string;
};

type Props = {
  cat: Cat | null;
};

export default function CatImage({ cat }: Props) {
  if (!cat) return null;
  return <Image source={{ uri: cat.url }} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
});
