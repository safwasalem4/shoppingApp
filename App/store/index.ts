import {configureStore} from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import cartSlice from './cartSlice';
import productsSlice from './productsSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
