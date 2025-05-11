import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addPoint } from '../store/catsSlice';
import CatImage from '../components/CatImage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import CoinAnimation from '../components/CoinAnimation';
import FallingCoin from '../components/FallingCoin';

const CounterScreen = () => {
  const textScale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
        Animated.sequence([
          Animated.timing(textScale, {
            toValue: 1.1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(textScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
    ).start();
  }, []);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { points, selectedCat } = useAppSelector((state) => state.cats);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [activeTab, setActiveTab] = useState<'Inventory' | 'Shop'>('Inventory');
  const [fallingCoins, setFallingCoins] = useState<number[]>([]);

  const handleClick = () => {
    dispatch(addPoint());
    spawnFallingCoin();

    // Немедленно сбрасываем обе анимации
    fadeAnim.stopAnimation(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        fadeAnim.setValue(0); // сбросить снова
      });
    });

    scaleAnim.stopAnimation(() => {
      scaleAnim.setValue(1);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(); // без сброса тут, чтобы вернулось к 1
    });
  };

  const spawnFallingCoin = () => {
    const id = Date.now() + Math.random(); // уникальный id
    setFallingCoins(prev => [...prev, id]);

    // Удаляем монетку после окончания анимации (1.5 сек)
    setTimeout(() => {
      setFallingCoins(prev => prev.filter(cid => cid !== id));
    }, 1500);
  };


  const handleTabPress = (tab: 'Inventory' | 'Shop') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
      <View style={styles.container}>

        <Animated.Text style={[styles.clickText, { transform: [{ scale: textScale }] }]}>
          КЛІКАЙ ПО КОТУ
        </Animated.Text>

        <View style={styles.pointsContainer}>
          <Image source={require('../assets/cc.png')} style={styles.catCoinIcon} />
          <Text style={styles.pointsText}>{points}</Text>
        </View>

        {fallingCoins.map(id => (
            <FallingCoin key={id} />
        ))}

        <TouchableOpacity onPress={handleClick} activeOpacity={0.8} style={styles.catButton}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            {selectedCat ? (
                <CatImage url={selectedCat.url} width={250} height={250} />
            ) : (
                <Image
                    source={{ uri: 'https://cataas.com/cat/says/Click%20me!' }}
                    style={styles.defaultCat}
                />
            )}
          </Animated.View>
          <CoinAnimation animatedValue={fadeAnim} />
        </TouchableOpacity>

        {/* Нижнее меню с 3 вкладками */}
        <View style={styles.bottomMenu}>
          {/* Инвентарь */}
          <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabPress('Inventory')}
          >
            <Text style={styles.icon}>🎒</Text>
            <Text style={[styles.tabText, activeTab === 'Inventory' && styles.activeTabText]}>
              Інвентар
            </Text>
            {activeTab === 'Inventory' && <View style={styles.activeLine} />}
          </TouchableOpacity>

          {/* Центральная кнопка */}
          <View style={styles.centerButtonWrapper}>
            <TouchableOpacity
                style={styles.centerButton}
                onPress={() => navigation.navigate('Counter')} // або залишити порожнім, якщо вже на Home
            >
              <Text style={styles.centerIcon}>🐱</Text>
            </TouchableOpacity>
          </View>

          {/* Магазин */}
          <TouchableOpacity
              style={styles.tabButton}
              onPress={() => handleTabPress('Shop')}
          >
            <Text style={styles.icon}>🛒</Text>
            <Text style={[styles.tabText, activeTab === 'Shop' && styles.activeTabText]}>
              Магазин
            </Text>
            {activeTab === 'Shop' && <View style={styles.activeLine} />}
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default CounterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff3e0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffd180',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  catCoinIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  pointsText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff6d00',
  },
  defaultCat: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  plusOne: {
    position: 'absolute',
    top: 20,
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 22,
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeTabText: {
    color: '#ff6600', // оранжевый цвет для активной вкладки
    fontWeight: 'bold',
  },
  activeLine: {
    position: 'absolute',
    top: 0,
    height: 3,
    width: '60%',
    backgroundColor: '#ff6600',
    borderRadius: 2,
  },
  centerButtonWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff6600',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  centerIcon: {
    fontSize: 28,
    color: '#fff',
  },
  catButton: {
    marginBottom: 250,
  },
  clickText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff6d00',
    marginBottom: 100,
    textAlign: 'center',
  },
});

