import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  shopId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stockQuantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    resetCart: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, removeItem, updateQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
