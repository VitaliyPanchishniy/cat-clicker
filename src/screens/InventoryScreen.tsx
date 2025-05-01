import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCat } from '../store/catsSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CatImage from '../components/CatImage';

const InventoryScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { ownedCats, selectedCat } = useAppSelector((state) => state.cats);
  const [activeTab, setActiveTab] = useState<'Inventory' | 'Shop' | 'Counter'>('Inventory');

  const handleTabPress = (tab: 'Shop' | 'Counter') => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мій інвентар</Text>

      {ownedCats.length === 0 ? (
        <Text style={styles.empty}>У вас ще немає котів.</Text>
      ) : (
        <FlatList
          data={ownedCats}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const isSelected = selectedCat?.id === item.id;
            return (
              <TouchableOpacity
                onPress={() => dispatch(selectCat(item))}
                style={[styles.catCard, isSelected && styles.selectedCard]}
              >
                <CatImage url={item.url} width={100} height={100} />
                <Text style={styles.catId}>ID: {item.id}</Text>
                {isSelected && <Text style={styles.selectedLabel}>Обраний</Text>}
              </TouchableOpacity>
            );
          }}
        />
      )}

      <View style={styles.bottomMenu}>
        {/* Інвентар */}
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.icon}>🎒</Text>
          <Text style={[styles.tabText, activeTab === 'Inventory' && styles.activeTabText]}>
            Інвентар
          </Text>
          {activeTab === 'Inventory' && <View style={styles.activeLine} />}
        </TouchableOpacity>

        {/* Центральна кнопка */}
        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => handleTabPress('Counter')}
          >
            <Text style={styles.centerIcon}>🐱</Text>
          </TouchableOpacity>
        </View>

        {/* Магазин */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('Shop')}
        >
          <Text style={styles.icon}>🛒</Text>
          <Text style={[styles.tabText, activeTab === 'Shop' && styles.activeTabText]}>
            Магазин
          </Text>
          {activeTab === 'Shop' && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
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
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  catCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#FF8C00',
  },
  catPrice: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  catId: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  selectedLabel: {
    fontSize: 14,
    color: '#FF8C00',
    fontWeight: 'bold',
    marginTop: 4,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 20,
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    color: '#F97316',
    fontWeight: 'bold',
  },
  activeLine: {
    marginTop: 4,
    height: 3,
    width: 30,
    backgroundColor: '#F97316',
    borderRadius: 2,
  },
  centerButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  centerButton: {
    backgroundColor: '#F97316',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  centerIcon: {
    fontSize: 28,
    color: '#fff',
  },
});
