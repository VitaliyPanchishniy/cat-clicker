import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Animated, Text, StyleSheet } from 'react-native';

interface Props {
    onPress: () => void;
}

export default function ShopButton({ onPress }: Props) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.1,
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
            <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.text}>Shop</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ffcc00',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
