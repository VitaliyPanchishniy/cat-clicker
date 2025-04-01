import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircleButton from '../components/CircleButton';
import { colors } from '../styles/colors';

export default function CounterScreen() {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>{count}</Text>
            <CircleButton onPress={() => setCount(count + 1)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counter: {
        fontSize: 48,
        color: colors.white,
        marginBottom: 20,
    },
});
