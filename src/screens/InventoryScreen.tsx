import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { buyCat } from '../store/catsSlice';
import { useGetCatsQuery } from '../services/api/api';

const ShopScreen = () => {
  const dispatch = useAppDispatch();
  const { data: cats, isLoading } = useGetCatsQuery();
  const ownedCats = useAppSelector(state => state.cats.ownedCats);
  const points = useAppSelector(state => state.cats.points);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleBuy = (cat: any) => {
    if (points >= cat.price) {
      dispatch(buyCat(cat));
    }
  };

  return (
    <FlatList
      data={cats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isOwned = ownedCats.some(c => c.id === item.id);
        return (
          <View style={styles.catContainer}>
            <Image source={{ uri: `https://cataas.com/cat/${item.id}` }} style={styles.image} />
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
