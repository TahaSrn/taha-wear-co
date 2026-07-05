// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "cart";

// تابع برای خواندن سبد خرید از localStorage
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
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

// تابع کمکی برای پیدا کردن آیتم
const findCartItem = (items, id, colorId, sizeId) => {
  return items.find((item) => {
    // اگر sizeId وجود نداشته باشه، فقط با id و colorId مقایسه کن
    if (sizeId === undefined || sizeId === null) {
      return item.id === id && item.colorId === colorId;
    }
    // اگر sizeId وجود داشته باشه، با همه مقایسه کن
    return item.id === id && item.colorId === colorId && item.sizeId === sizeId;
  });
};

// تابع کمکی برای فیلتر کردن آیتم
const filterCartItem = (items, id, colorId, sizeId) => {
  return items.filter((item) => {
    if (sizeId === undefined || sizeId === null) {
      return !(item.id === id && item.colorId === colorId);
    }
    return !(
      item.id === id &&
      item.colorId === colorId &&
      item.sizeId === sizeId
    );
  });
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // پیدا کردن آیتم با همان id، colorId و sizeId
      const existingItem = findCartItem(
        state.items,
        newItem.id,
        newItem.colorId,
        newItem.sizeId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      // محاسبه مجدد مجموع
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      saveCartToStorage(state);
    },

    removeItem: (state, action) => {
      const { id, colorId, sizeId } = action.payload;
      console.log("Removing item - payload:", { id, colorId, sizeId });
      console.log("Current items:", state.items);

      const beforeCount = state.items.length;
      state.items = filterCartItem(state.items, id, colorId, sizeId);
      const afterCount = state.items.length;

      console.log(`Removed ${beforeCount - afterCount} item(s)`);

      // محاسبه مجدد مجموع
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      saveCartToStorage(state);
    },

    increaseQuantity: (state, action) => {
      const { id, colorId, sizeId } = action.payload;
      console.log("Increasing quantity - payload:", { id, colorId, sizeId });

      const existingItem = findCartItem(state.items, id, colorId, sizeId);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;

        // محاسبه مجدد مجموع
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0,
        );
        saveCartToStorage(state);
      } else {
        console.warn("Item not found for increase:", { id, colorId, sizeId });
        console.warn("Available items:", state.items);
      }
    },

    decreaseQuantity: (state, action) => {
      const { id, colorId, sizeId } = action.payload;
      console.log("Decreasing quantity - payload:", { id, colorId, sizeId });

      const existingItem = findCartItem(state.items, id, colorId, sizeId);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // حذف آیتم
          state.items = filterCartItem(state.items, id, colorId, sizeId);
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }

        // محاسبه مجدد مجموع
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0,
        );
        saveCartToStorage(state);
      } else {
        console.warn("Item not found for decrease:", { id, colorId, sizeId });
        console.warn("Available items:", state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToStorage(state);
    },

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
