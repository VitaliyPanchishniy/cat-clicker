import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useAppSelector } from '../store/hooks';

export default function InventoryScreen() {
  const ownedCats = useAppSelector(state => state.cats.ownedCats);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваші Коти</Text>
      <FlatList
        data={ownedCats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.catContainer}>
            <Image source={{ uri: item.url }} style={styles.image} />
            <Text>ID: {item.id}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  catContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});
