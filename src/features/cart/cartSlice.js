// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "cart";

// تابع برای خواندن سبد خرید از localStorage
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // محاسبه مجدد totalQuantity و totalPrice
      const totalQuantity = parsed.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const totalPrice = parsed.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      return {
        items: parsed.items || [],
        totalQuantity,
        totalPrice,
      };
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
};

// تابع برای ذخیره سبد خرید در localStorage
const saveCartToStorage = (state) => {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        items: state.items,
      }),
    );
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // پیدا کردن آیتم با همان id و colorId
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.colorId === newItem.colorId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
      saveCartToStorage(state);
    },

    removeItem: (state, action) => {
      const { id, colorId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.colorId === colorId,
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter(
          (item) => !(item.id === id && item.colorId === colorId),
        );
        saveCartToStorage(state);
      }
    },

    increaseQuantity: (state, action) => {
      const { id, colorId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.colorId === colorId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
        saveCartToStorage(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const { id, colorId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.colorId === colorId,
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => !(item.id === id && item.colorId === colorId),
          );
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.price;
        }
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
        saveCartToStorage(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToStorage(state);
    },

    // برای همگام‌سازی اولیه (اگه نیاز بشه)
    loadCart: (state) => {
      const loaded = loadCartFromStorage();
      state.items = loaded.items;
      state.totalQuantity = loaded.totalQuantity;
      state.totalPrice = loaded.totalPrice;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;
