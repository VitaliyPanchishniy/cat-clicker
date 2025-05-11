import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FallingCoin = () => {
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const randomLeft = useRef(Math.random() * (SCREEN_WIDTH - 30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                })
            ),
        ]).start();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.Image
            source={require('../assets/cc.png')}
            style={[
                styles.coin,
                {
                    left: randomLeft,
                    transform: [
                        { translateY },
                        { scale: 0.6 + Math.random() * 0.4 },
                        { rotate },
                    ],
                    opacity,
                },
            ]}
            resizeMode="contain"
        />
    );
};

export default FallingCoin;

const styles = StyleSheet.create({
    coin: {
        position: 'absolute',
        width: 30,
        height: 30,
        top: -50,
    },
});
