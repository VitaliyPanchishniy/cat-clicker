import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircleButton from '../components/CircleButton';
import ShopButton from '../components/ShopButton';
import CatImage from '../components/CatImage'; // 👉 додано
import { colors } from '../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Counter'>;

export default function CounterScreen({ navigation }: Props) {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            {/* Картинка кота */}
            <CatImage uri="https://cataas.com/cat" />

            <Text style={styles.counter}>{count}</Text>
            <CircleButton onPress={() => setCount(count + 1)} />
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
