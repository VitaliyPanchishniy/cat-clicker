import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCat } from '../store/catsSlice';
import CatImage from '../components/CatImage';

const InventoryScreen = () => {
  const dispatch = useAppDispatch();
  const { ownedCats } = useAppSelector((state) => state.cats);
  console.log(ownedCats);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      {ownedCats.length === 0 ? (
        <Text style={styles.empty}>No cats owned yet.</Text>
      ) : (
        <FlatList
          data={ownedCats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => dispatch(selectCat(item))} style={styles.card}>
              <CatImage url={item.url} />
              <Text style={styles.idText}>ID: {item.id}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 12,
  },
  idText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});
