import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props {
    onPress: () => void;
}

export default function CircleButton({ onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={styles.circle} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
});
