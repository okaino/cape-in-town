import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for the count
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// Create a slice for the product
const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload); // Add a new product to the array
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(product => product.id === action.payload.id && (product.extraChick == action.payload.extraChick || product.extraPatty == action.payload.extraPatty)) ;
      if (index !== -1) {
        console.log(state[index])
        state[index] = { ...state[index], ...action.payload }; // Update product by ID
      }
    },
    removeProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload.id); // Remove product by ID
    },
    deleteCart: (state, action) => {
      return state.splice(0, state.length); // Remove product by ID
    },
    updateAllProducts: (state, action) => {
      return [...action.payload]; // Replace state with the new array
    },
  },
});

export const { increment, incrementByAmount } = counterSlice.actions;
export const { addProduct, updateProduct, removeProduct, deleteCart, updateAllProducts } = productSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    products: productSlice.reducer,
  },
});

export default store;
