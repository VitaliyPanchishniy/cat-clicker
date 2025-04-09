import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';

interface Props {
    onPress: () => void;
}

export default function CircleButton({ onPress }: Props) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.15,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start(() => onPress());
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}/>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 100,
        height: 100,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
    },
});
