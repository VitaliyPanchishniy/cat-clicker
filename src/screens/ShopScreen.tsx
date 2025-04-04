import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { useGetCatsQuery } from '../services/api/api';

export default function ShopScreen() {
  const { data, error, isLoading } = useGetCatsQuery();

  if (isLoading) return <Text>Loading...</Text>;
  if (error || !data) return <Text>Error loading cats</Text>;

  console.log('Fetched cats:', data); // Перевіряємо дані

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.catItem}>
            <Image source={{ uri: `https://cataas.com${item.url}` }} style={styles.catImage} />
            <Text>Price: {Math.floor(Math.random() * 100) + 1}</Text>
            <Button title="Buy" onPress={() => console.log(`Bought cat from: ${item.url}`)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  catItem: { alignItems: 'center', marginBottom: 20 },
  catImage: { width: 150, height: 150, borderRadius: 10, backgroundColor: '#ddd' },
});
