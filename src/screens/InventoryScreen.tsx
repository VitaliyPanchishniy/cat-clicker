import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCat } from '../store/catsSlice';
import CatImage from '../components/CatImage';

const InventoryScreen = () => {
  const dispatch = useAppDispatch();
  const { ownedCats, selectedCat } = useAppSelector((state) => state.cats);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      {ownedCats.length === 0 ? (
        <Text style={styles.empty}>No cats owned yet.</Text>
      ) : (
        <FlatList
          data={ownedCats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = selectedCat?.id === item.id;
            return (
              <TouchableOpacity
                onPress={() => dispatch(selectCat(item))}
                style={[styles.card, isSelected && styles.selectedCard]}
              >
                <CatImage url={item.url} width={120} height={120} />
                <Text style={styles.idText}>ID: {item.id}</Text>
                {isSelected && <Text style={styles.selectedLabel}>Selected</Text>}
              </TouchableOpacity>
            );
          }}
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
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 12,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#ff8c00',
  },
  idText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  selectedLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#ff8c00',
    fontWeight: 'bold',
  },
});
