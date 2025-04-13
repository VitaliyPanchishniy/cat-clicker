import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useGetCatsQuery } from '../services/api/api';
import { colors } from '../styles/colors';

export default function ShopScreen() {
  const { data: cats, isLoading, error } = useGetCatsQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.white} style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (error) {
    return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load cats 😿</Text>
        </View>
    );
  }

  return (
      <FlatList
          data={cats}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
              <View style={styles.catContainer}>
                <Image source={{ uri: item.url }} style={styles.catImage} />
                <Text style={styles.price}>Price: {item.price}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Купити</Text>
                </TouchableOpacity>
              </View>
          )}
      />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: colors.gray,
  },
  catContainer: {
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    padding: 12,
    borderRadius: 16,
  },
  catImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  price: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.gray,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
