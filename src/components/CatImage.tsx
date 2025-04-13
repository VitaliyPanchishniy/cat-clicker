import React, { useRef } from 'react';
import {
    Animated,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
} from 'react-native';

interface Props {
    onPress: () => void;
    catUri: string;
}

export default function CircleButton({ onPress, catUri }: Props) {
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
            <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}>
                <Image source={{ uri: catUri }} style={styles.image} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
