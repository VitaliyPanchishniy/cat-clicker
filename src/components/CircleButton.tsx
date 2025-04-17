import React, { useRef, useEffect } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import Sound from 'react-native-sound';

interface Props {
  onPress: () => void;
  catUri: string;
}

export default function CircleButton({ onPress, catUri }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    soundRef.current = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
      }
    });

    return () => {
      soundRef.current?.release();
    };
  }, []);

  const playSound = () => {
   if (soundRef.current) {
      soundRef.current.stop(() => {
       soundRef.current?.play();
      });
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.15,
      useNativeDriver: true,
    }).start();

    playSound();
    onPress();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={{ uri: catUri }} style={styles.image} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
