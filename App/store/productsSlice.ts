import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ProductsState {
  allProducts: any[];
  limit: number;
  skip: number;
  loading: boolean;
  total: number;
}

export const insertProducts = createAsyncThunk(
  'products/getProducts',
  async ({ data }: any, thunkAPI) => {
    try {
      let result = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${data}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    limit: 10,
    skip: 0,
    loading: false,
    total: 0,
  } as ProductsState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(`${insertProducts.pending}`, state => {
        state.loading = true;
      })
      .addCase(
        `${insertProducts.fulfilled}`,
        (state, action: PayloadAction<any>) => {
          if (action.payload.skip === 0) {
            state.allProducts = [...action.payload.products];
          } else {
            state.allProducts = [
              ...state.allProducts,
              ...action.payload.products,
            ];
          }
          state.skip = action.payload.skip;
          state.total = action.payload.total;
          state.loading = false;
        },
      )
      .addCase(`${insertProducts.rejected}`, state => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
