import { createSlice } from '@reduxjs/toolkit';


export interface CartSlice {
  cart: any[],
  totalPrice: number,
  totalQuantity: number,
}


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalPrice: 0,
    totalQuantity: 0,
  } as CartSlice,
  reducers: {
    addCart: (state, action) => {
      let addedItem = state.cart.find((item) => item.id == action.payload.id);
      if (addedItem) {
        state.cart = state.cart.filter(item => action.payload.id != item.id);

        addedItem.quantity = addedItem.quantity + action.payload.quantity;
        state.totalQuantity = state.totalQuantity + action.payload.quantity;
        state.totalPrice += action.payload.quantity * +action.payload.price;
        state.cart = [...state.cart, addedItem];
      } else {
        state.totalQuantity = state.totalQuantity + action.payload.quantity;
        state.totalPrice += action.payload.quantity * +action.payload.price;
        state.cart = [action.payload, ...state.cart];
      }
    },
    changeQuantity: (state, action) => {
      let item = state.cart.find((item) => item.id == action.payload.id);
      let x = state.cart.findIndex((item) => item.id == action.payload.id);
      state.cart[x].quantity = action.payload.quantity;
      state.totalQuantity = 0;
      state.totalPrice = 0;

      state.cart.map((itemk) => {
        state.totalQuantity += itemk.quantity;
        state.totalPrice += itemk.quantity * +itemk.price;
      });
    },
    removeItem: (state, action) => {
      let new_items = state.cart.filter(item => action.payload.id !== item.id);
      state.cart = [...new_items];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      new_items.map(itemk => {
        state.totalQuantity += itemk.quantity;
        state.totalPrice += itemk.quantity * +itemk.price;
      });
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addCart, clearCart, changeQuantity, removeItem } =
  cartSlice.actions;
