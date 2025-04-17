import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { buyCat, setAllCats, refreshShopCats } from '../store/catsSlice';
import { useGetCatsQuery } from '../services/api/api';
import { Cat } from '../store/catsSlice';

const ShopScreen = () => {
  const dispatch = useAppDispatch();
  const { data: cats, isLoading } = useGetCatsQuery();
  const ownedCats = useAppSelector(state => state.cats.ownedCats);
  const points = useAppSelector(state => state.cats.points);
  const shopCats = useAppSelector(state => state.cats.shopCats);

  // Коли завантажились коти, зберігаємо у Redux і формуємо початкові shopCats
  useEffect(() => {
    if (cats && cats.length > 0) {
      const limitedCats = cats.slice(0, 20).map((cat: any) => ({
        id: cat.id,
        url: `https://cataas.com/cat/${cat.id}`,
        price: Math.floor(Math.random() * 20) + 1,
      }));
      dispatch(setAllCats(limitedCats));
      dispatch(refreshShopCats());
    }
  }, [cats, dispatch]);

  // Таймер кожні 5 хв оновлює shopCats
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshShopCats());
    }, 5 * 60 * 1000); // 5 хвилин

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleBuy = (cat: Cat) => {
    if (points >= cat.price) {
      dispatch(buyCat(cat));
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={shopCats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isOwned = ownedCats.some(c => c.id === item.id);
        return (
          <View style={styles.catContainer}>
            <Image source={{ uri: item.url }} style={styles.image} />
            <Text>Price: {item.price}</Text>
            <Button
              title={isOwned ? 'Придбано' : 'Купити'}
              disabled={isOwned || points < item.price}
              onPress={() => handleBuy(item)}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  catContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default ShopScreen;
