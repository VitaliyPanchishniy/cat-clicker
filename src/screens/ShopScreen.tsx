import React, { useRef } from 'react';
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
import { buyCat } from '../store/catsSlice';
import { useGetCatsQuery } from '../services/api/api';
import { Cat } from '../services/api/types';
import { colors } from '../styles/colors';

const ShopScreen = () => {
  const dispatch = useAppDispatch();
  const { data: cats, isLoading, error } = useGetCatsQuery();
  const ownedCats = useAppSelector((state) => state.cats.ownedCats);
  const points = useAppSelector((state) => state.cats.points);

  const animatedValues = useRef<Animated.Value[]>([]).current;

  if (cats && animatedValues.length !== cats.length) {
    cats.forEach((_, i) => {
      if (!animatedValues[i]) {
        animatedValues[i] = new Animated.Value(1);
      }
    });
  }

  const handleBuy = (cat: Cat, index: number) => {
    const isOwned = ownedCats.some((c) => c.id === cat.id);
    if (isOwned || points < cat.price) return;

    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      dispatch(buyCat(cat));
    });
  };

  const renderItem = ({ item, index }: { item: Cat; index: number }) => {
    const isOwned = ownedCats.some((c) => c.id === item.id);
    const animatedStyle = {
      opacity: animatedValues[index],
      transform: [{ scale: animatedValues[index] }],
    };

    return (
      <Animated.View style={[styles.catContainer, animatedStyle]}>
        <Image source={{ uri: item.url }} style={styles.catImage} resizeMode="contain" />
        <Text style={styles.price}>💰 {item.price}</Text>
        <TouchableOpacity
          style={[
            styles.button,
            isOwned || points < item.price ? styles.buttonDisabled : null,
          ]}
          onPress={() => handleBuy(item, index)}
          disabled={isOwned || points < item.price}
        >
          <Text style={styles.buttonText}>
            {isOwned ? 'Уже куплено' : 'Купити'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
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
        <Text style={styles.errorText}>Не вдалося завантажити котів 😿</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 Магазин котів</Text>
      <Text style={styles.points}>CatCoins: {points}</Text>
      <FlatList
        data={cats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
      />
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF8F0',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: colors.darkGray || '#000',
  },
  points: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: colors.darkGray || '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  list: {
    gap: 16,
    justifyContent: 'center',
  },
  catContainer: {
    backgroundColor: '#FFEDD5',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    margin: 8,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  catImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#F97316',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonDisabled: {
    backgroundColor: '#D4D4D4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
