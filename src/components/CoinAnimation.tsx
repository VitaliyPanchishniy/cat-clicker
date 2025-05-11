import React from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

interface CoinAnimationProps {
  animatedValue: Animated.Value;
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({ animatedValue }) => {
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -40],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[styles.coin, { opacity, transform: [{ translateY }] }]}>
      <Image source={require('../assets/cc.png')} style={styles.image} />
      <Text style={styles.text}>+1</Text>
    </Animated.View>
  );
};

export default CoinAnimation;

const styles = StyleSheet.create({
  coin: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  image: {
    width: 24,
    height: 24,
    marginTop: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700', // золотий колір
    marginTop: 4,
  },
});
