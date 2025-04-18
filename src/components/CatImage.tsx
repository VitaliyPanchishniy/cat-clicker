import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  url: string;
}

const CatImage: React.FC<Props> = ({ url }) => {
   console.log('Rendering CatImage with url:', url); // Додано лог
  return (
    <Image
      source={{ uri: url }}
      style={styles.image}
      resizeMode="cover"
    />
  );
};

export default CatImage;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});
