import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Cat = {
  id: string;
  url: string;
  price: number;
};

export type CatState = {
  points: number;
  selectedCat: Cat | null;
  ownedCats: Cat[];
  allCats: Cat[];
  shopCats: Cat[]; // список 5 рандомних котів
};

const initialState: CatState = {
  points: 0,
  selectedCat: null,
  ownedCats: [],
  allCats: [], // 20 котів сюди
  shopCats: [],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    incrementPoints(state) {
      state.points += 1;
    },
    buyCat(state, action: PayloadAction<Cat>) {
      state.ownedCats.push(action.payload);
      state.points -= action.payload.price;
    },
    selectCat(state, action: PayloadAction<Cat>) {
      state.selectedCat = action.payload;
    },
    setAllCats(state, action: PayloadAction<Cat[]>) {
      state.allCats = action.payload;
    },
    setShopCats(state, action: PayloadAction<Cat[]>) {
      state.shopCats = action.payload;
    },
    refreshShopCats(state) {
      const shuffled = [...state.allCats].sort(() => 0.5 - Math.random());
      state.shopCats = shuffled.slice(0, 5);
    }
  },
});

export const {
  incrementPoints,
  buyCat,
  selectCat,
  setAllCats,
  setShopCats,
  refreshShopCats,
} = catsSlice.actions;

export default catsSlice.reducer;
