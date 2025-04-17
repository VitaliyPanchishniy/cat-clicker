import { createSlice } from '@reduxjs/toolkit';
import type { Cat } from './catsSlice';


type ShopState = {
  shopCats: Cat[];
};

const initialState: ShopState = {
  shopCats: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopCats(state, action: { payload: Cat[] }) {
      state.shopCats = action.payload;
    },
  },
});

export const { setShopCats } = shopSlice.actions;
export default shopSlice.reducer;
