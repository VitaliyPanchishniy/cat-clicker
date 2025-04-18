// src/store/catsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cat } from '../services/api/types';

interface CatsState {
  points: number;
  selectedCat: Cat | null;
  ownedCats: Cat[];
  shopCats: Cat[];
  allCats: Cat[]; // повний список котів (можливо з API)
}

const initialState: CatsState = {
  points: 0,
  selectedCat: null,
  ownedCats: [],
  shopCats: [],
  allCats: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    addPoint: (state) => {
      state.points += 1;
    },
    buyCat: (state, action: PayloadAction<Cat>) => {
      const cat = action.payload;
      if (state.points >= cat.price && !state.ownedCats.find((c) => c.id === cat.id)) {
        state.points -= cat.price;
        state.ownedCats.push(cat);
      }
    },
    selectCat: (state, action: PayloadAction<Cat>) => {
      state.selectedCat = action.payload;
    },
    setShopCats: (state, action: PayloadAction<Cat[]>) => {
      state.shopCats = action.payload;
    },
   setAllCats: (state, action: PayloadAction<Cat[]>) => {
  const uniqueMap = new Map<string, Cat>();
  action.payload.forEach((cat) => {
    if (!uniqueMap.has(cat.id)) {
      uniqueMap.set(cat.id, cat);
    }
  });
  const uniqueCats = Array.from(uniqueMap.values());

  state.allCats = uniqueCats;
  state.shopCats = uniqueCats.slice(0, 6);
},

    refreshShopCats: (state) => {
  const uniqueMap = new Map<string, Cat>();
  const shuffled = [...state.allCats].sort(() => 0.5 - Math.random());

  for (const cat of shuffled) {
    if (!uniqueMap.has(cat.id)) {
      uniqueMap.set(cat.id, cat);
    }
    if (uniqueMap.size === 6) break; // зупиняємось на 6 унікальних котах
  }

  state.shopCats = Array.from(uniqueMap.values());
},

  },
});

export const {
  addPoint,
  buyCat,
  selectCat,
  setShopCats,
  setAllCats,
  refreshShopCats,
} = catsSlice.actions;


export default catsSlice.reducer;
