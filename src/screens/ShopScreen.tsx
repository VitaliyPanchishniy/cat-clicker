import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { buyCat } from '../store/catsSlice';
import { useGetCatsQuery } from '../services/api/api';
import CatImage from '../components/CatImage';
import { Cat } from '../services/api/types';
import { colors } from '../styles/colors';

export default function ShopScreen() {
  const dispatch = useAppDispatch();
  const { data: cats, isLoading, error } = useGetCatsQuery();
  const ownedCats = useAppSelector(state => state.cats.ownedCats);
  const points = useAppSelector(state => state.cats.points);

  const handleBuy = (cat: Cat) => {
    const isOwned = ownedCats.some(c => c.id === cat.id);
    if (!isOwned && points >= cat.price) {
      dispatch(buyCat(cat));
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.white} />
        <Text>Завантаження котів...</Text>
      </View>
    );
  }

  if (error || !cats) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load cats 😿</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Магазин котів</Text>
      <Text style={styles.points}>CatCoins: {points}</Text>

      <FlatList
        data={cats}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isOwned = ownedCats.some(c => c.id === item.id);
          return (
            <TouchableOpacity
              onPress={() => handleBuy(item)}
              style={[styles.card, isOwned && styles.disabled]}
              disabled={isOwned || points < item.price}
            >
              <CatImage url={item.url} />
              <Text style={styles.price}>Ціна: {item.price} 💰</Text>
              {isOwned && <Text style={styles.ownedText}>Придбано</Text>}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.gray,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: colors.white,
  },
  points: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: colors.white,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    padding: 10,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.6,
  },
  price: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.white,
  },
  ownedText: {
    fontSize: 12,
    color: 'green',
    marginTop: 4,
  },
});
