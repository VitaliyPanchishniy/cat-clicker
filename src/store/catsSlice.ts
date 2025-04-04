import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cat {
  id: string;
  url: string;
  price: number;
}

interface CatsState {
  score: number;
  selectedCat: string;
  ownedCats: string[];
  shopCats: Cat[];
}

const initialState: CatsState = {
  score: 0,
  selectedCat: '',
  ownedCats: [],
  shopCats: [
    { id: '1', url: 'https://cataas.com/cat', price: 10 },
    { id: '2', url: 'https://cataas.com/cat?type=2', price: 20 },
  ],
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    incrementScore: (state) => { state.score += 1; },
    buyCat: (state, action: PayloadAction<string>) => {
      const cat = state.shopCats.find((c) => c.id === action.payload);
      if (cat && state.score >= cat.price) {
        state.score -= cat.price;
        state.ownedCats.push(cat.id);
      }
    },
    selectCat: (state, action: PayloadAction<string>) => {
      if (state.ownedCats.includes(action.payload)) {
        state.selectedCat = action.payload;
      }
    },
  },
});

export const { incrementScore, buyCat, selectCat } = catsSlice.actions;
export default catsSlice.reducer;
