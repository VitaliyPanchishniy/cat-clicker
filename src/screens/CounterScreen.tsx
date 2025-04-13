import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import CircleButton from '../components/CircleButton';
import ShopButton from '../components/ShopButton';
// import CatImage from '../components/CatImage';
import { colors } from '../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Counter'>;

export default function CounterScreen({ navigation }: Props) {
    const [count, setCount] = useState(0);
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animateCounter = () => {
        opacityAnim.setValue(0);
        scaleAnim.setValue(0.4);

        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 150,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                speed: 20,
                bounciness: 10,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        animateCounter();
    }, [count]);

    const handleIncrement = () => {
        setCount(prev => prev + 1);
    };

    return (
        <View style={styles.container}>

            {/* Анимированное число */}
            <Animated.Text style={[
                styles.counter,
                {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}>
                {count}
            </Animated.Text>

            {/* Кнопка по центру */}
            <View style={styles.buttonWrapper}>
                <CircleButton onPress={handleIncrement} catUri="https://cataas.com/cat" />
            </View>

            {/* Кнопка перехода в магазин */}
            <ShopButton onPress={() => navigation.navigate('Shop')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray,
        paddingTop: 40,
    },
    counter: {
        fontSize: 72,
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
