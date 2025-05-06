import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { buyCat, addPoints } from '../store/catsSlice';
import { useGetCatsQuery } from '../services/api/api';
import { Cat } from '../services/api/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const MAX_VISIBLE_CATS = 6;

const ShopScreen = () => {
  const dispatch = useAppDispatch();
  const points = useAppSelector((state) => state.cats.points);
  const ownedCats = useAppSelector((state) => state.cats.ownedCats);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: cats = [], isLoading, error } = useGetCatsQuery();

  const [displayedCats, setDisplayedCats] = useState<Cat[]>([]);
  const animatedValues = useRef<Animated.Value[]>([]).current;
  const [activeTab, setActiveTab] = useState<'Inventory' | 'Shop' | 'Counter'>('Shop');

  useEffect(() => {
    if (cats.length && displayedCats.length === 0) {
      const filtered = cats.filter((cat) => !ownedCats.some((owned) => owned.id === cat.id));
      const initial = filtered.slice(0, MAX_VISIBLE_CATS);
      setDisplayedCats(initial);
      initial.forEach((_, i) => {
        animatedValues[i] = new Animated.Value(1);
      });
    }
  }, [cats, ownedCats]);

  const handleBuy = (cat: Cat, index: number) => {
    const isOwned = ownedCats.some((c) => c.id === cat.id);
    if (isOwned || points < cat.price) return;

    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      dispatch(buyCat(cat));

      const usedIds = new Set([
        ...ownedCats.map((c) => c.id),
        ...displayedCats.map((c) => c.id),
        cat.id,
      ]);
      const nextCat = cats.find((c) => !usedIds.has(c.id));
      const updated = [...displayedCats];

      if (nextCat) {
        updated[index] = nextCat;
        animatedValues[index] = new Animated.Value(0);
        setDisplayedCats(updated);

        Animated.timing(animatedValues[index], {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      } else {
        updated.splice(index, 1);
        setDisplayedCats(updated);
      }
    });
  };

  const handleTabPress = (tab: 'Inventory' | 'Counter') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const renderItem = ({ item, index }: { item: Cat | 'donate'; index: number }) => {
    if (item === 'donate') {
      return (
        <View style={styles.catCard}>
          <Text style={styles.catPrice}>🎁 Безкоштовні CatCoins</Text>
          <TouchableOpacity
            style={[styles.buyButton, { backgroundColor: '#4ADE80' }]}
            onPress={() => dispatch(addPoints(100))}
          >
            <Text style={styles.buyButtonText}>Отримати 100 монет</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const isOwned = ownedCats.some((c) => c.id === item.id);
    const animatedStyle = {
      opacity: animatedValues[index],
      transform: [{ scale: animatedValues[index] }],
    };

    return (
      <Animated.View style={[styles.catCard, animatedStyle]}>
        <Image source={{ uri: item.url }} style={styles.catImage} resizeMode="cover" />
        <Text style={styles.catPrice}>💰 {item.price}</Text>
        <TouchableOpacity
          style={[
            styles.buyButton,
            (isOwned || points < item.price) && styles.buttonDisabled,
          ]}
          onPress={() => handleBuy(item, index)}
          disabled={isOwned || points < item.price}
        >
          <Text style={styles.buyButtonText}>
            {isOwned ? 'Уже куплено' : 'Купити'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F97316" />
        <Text>Завантаження котів...</Text>
      </View>
    );
  }

  if (error || !cats.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Не вдалося завантажити котів 😿</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Магазин котів</Text>
      <Text style={styles.points}>CatCoins: {points}</Text>

      {displayedCats.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ fontSize: 16 }}>😺 Ви купили всіх доступних котиків!</Text>
        </View>
      ) : (
        <FlatList
          data={[...displayedCats, 'donate']}
          keyExtractor={(item, index) => (item === 'donate' ? 'donate' : item.id)}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
      )}

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.tabButton} onPress={() => handleTabPress('Inventory')}>
          <Text style={styles.icon}>🎒</Text>
          <Text style={[styles.tabText, activeTab === 'Inventory' && styles.activeTabText]}>
            Інвентар
          </Text>
          {activeTab === 'Inventory' && <View style={styles.activeLine} />}
        </TouchableOpacity>

        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity style={styles.centerButton} onPress={() => handleTabPress('Counter')}>
            <Text style={styles.centerIcon}>🐱</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.tabButton}>
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

export default ShopScreen;

// СТИЛІ залишаються ті ж
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', paddingTop: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F0' },
  title: { fontSize: 24, fontWeight: 'bold', alignSelf: 'center' },
  points: { fontSize: 16, textAlign: 'center', marginVertical: 10 },
  errorText: { color: 'red', fontSize: 16 },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  catCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    elevation: 3,
    minHeight: 180,
    justifyContent: 'center',
  },
  catImage: { width: 100, height: 100, borderRadius: 8 },
  catPrice: { marginTop: 8, fontSize: 14, fontWeight: 'bold', color: '#FF8C00' },
  buyButton: {
    marginTop: 6,
    backgroundColor: '#F97316',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buyButtonText: { color: '#fff', fontWeight: 'bold' },
  buttonDisabled: { backgroundColor: '#D4D4D4' },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: { alignItems: 'center', flex: 1 },
  icon: { fontSize: 20 },
  tabText: { fontSize: 12, color: '#666' },
  activeTabText: { color: '#F97316', fontWeight: 'bold' },
  activeLine: {
    marginTop: 4,
    height: 3,
    width: 30,
    backgroundColor: '#F97316',
    borderRadius: 2,
  },
  centerButtonWrapper: { position: 'absolute', bottom: 20, alignSelf: 'center' },
  centerButton: {
    backgroundColor: '#F97316',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  centerIcon: { fontSize: 28, color: '#fff' },
});
