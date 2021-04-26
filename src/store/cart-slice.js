import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0, totalAmount: 0 },
    reducers: {
        addItemToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(it => it.id === item.id);

            if (!existingItem) {
                state.items.push({ id: item.id,
                                    price: item.price,
                                    quantity: item.quantity,
                                    totalPrice: item.price,
                                    name: item.title
                                });
            } else {
                existingItem.quantity += item.quantity;
                existingItem.totalPrice += item.quantity * item.price;
            }

            state.totalAmount += item.quantity * item.price;
            state.totalQuantity += item.quantity;
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity -= 1;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalAmount -= existingItem.price;
            state.totalQuantity -= 1;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;