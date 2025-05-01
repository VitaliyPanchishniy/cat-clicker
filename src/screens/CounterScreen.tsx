import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addPoint } from '../store/catsSlice';
import CatImage from '../components/CatImage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

const CounterScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { points, selectedCat } = useAppSelector((state) => state.cats);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [activeTab, setActiveTab] = useState<'Inventory' | 'Shop'>('Inventory');

  const handleClick = () => {
    dispatch(addPoint());

    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const handleTabPress = (tab: 'Inventory' | 'Shop') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.points}>CatCoins: {points}</Text>

      <TouchableOpacity onPress={handleClick} activeOpacity={0.8}>
        {selectedCat ? (
          <CatImage url={selectedCat.url} width={250} height={250} />
        ) : (
          <Image
            source={{ uri: 'https://cataas.com/cat/says/Click%20me!' }}
            style={styles.defaultCat}
          />
        )}
        <Animated.Text style={[styles.plusOne, { opacity: fadeAnim }]}>
          +1
        </Animated.Text>
      </TouchableOpacity>

      {/* Нижнє меню з 3 вкладками */}
<View style={styles.bottomMenu}>
  {/* Інвентар */}
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

  {/* Центральна кнопка */}
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
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  points: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: '#ff6600', // помаранчевий текст для активної вкладки
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

});



