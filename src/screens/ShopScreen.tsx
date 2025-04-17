import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { buyCat, setAllCats, refreshShopCats } from '../store/catsSlice';
import { useGetCatsQuery } from '../services/api/api';
import { Cat } from '../store/catsSlice';

const REFRESH_INTERVAL = 1 * 60; // 5 хвилин у секундах

const ShopScreen = () => {
  const dispatch = useAppDispatch();
  const { data: cats, isLoading } = useGetCatsQuery();
  const ownedCats = useAppSelector(state => state.cats.ownedCats);
  const points = useAppSelector(state => state.cats.points);
  const shopCats = useAppSelector(state => state.cats.shopCats);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);

  // Отримання котів і ініціалізація
  useEffect(() => {
    if (cats && cats.length > 0) {
      const limitedCats = cats.slice(0, 20).map((cat: any) => ({
        id: cat.id,
        url: `https://cataas.com/cat/${cat.id}`,
        price: Math.floor(Math.random() * 50) + 10,
      }));
      dispatch(setAllCats(limitedCats));
      dispatch(refreshShopCats());
      setCountdown(REFRESH_INTERVAL); // стартуємо таймер
    }
  }, [cats, dispatch]);

  // Зворотній відлік таймера
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          dispatch(refreshShopCats());
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBuy = (cat: Cat) => {
    if (points >= cat.price) {
      dispatch(buyCat(cat));
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Завантаження котів...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.timerText}>Оновлення магазину через: {formatTime(countdown)}</Text>
      <FlatList
        data={shopCats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isOwned = ownedCats.some(c => c.id === item.id);
          return (
            <View style={styles.catContainer}>
              <Image source={{ uri: item.url }} style={styles.image} />
              <Text>Ціна: {item.price} 💰</Text>
              <Button
                title={isOwned ? 'Придбано' : 'Купити'}
                disabled={isOwned || points < item.price}
                onPress={() => handleBuy(item)}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    alignItems: 'center',
  },
  catContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    width: 220,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default ShopScreen;
