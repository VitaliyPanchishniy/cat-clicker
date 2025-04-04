import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircleButton from '../components/CircleButton';
import ShopButton from '../components/ShopButton';
import { colors } from '../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Counter'>;

export default function CounterScreen({ navigation }: Props) {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>{count}</Text>
            <CircleButton onPress={() => setCount(count + 1)} />
            {/* Кнопка магазину */}
            <ShopButton onPress={() => navigation.navigate('Shop')} />
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
