// store/catsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Cat = {
  id: string;
  url: string;
  price: number;
};

type CatsState = {
  points: number;
  selectedCat: Cat | null;
  ownedCats: Cat[];
  allCats: Cat[];
  shopCats: Cat[];
};

const initialState: CatsState = {
  points: 0,
  selectedCat: null,
  ownedCats: [],
  allCats: [],
  shopCats: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    incrementPoints(state) {
      state.points += 1; // Заробіток за 1 клік
    },
    buyCat(state, action: PayloadAction<Cat>) {
      const cat = action.payload;
      if (state.points >= cat.price && !state.ownedCats.some(c => c.id === cat.id)) {
        state.points -= cat.price;
        state.ownedCats.push(cat);
      }
    },
    setAllCats(state, action: PayloadAction<Cat[]>) {
      state.allCats = action.payload;
    },
    refreshShopCats(state) {
      const shuffled = [...state.allCats].sort(() => 0.5 - Math.random());
      state.shopCats = shuffled.slice(0, 5);
    },
  },
});

export const { incrementPoints, buyCat, setAllCats, refreshShopCats } = catsSlice.actions;
export default catsSlice.reducer;
