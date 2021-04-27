import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartVisible: false, notification: { status: '', title: '', message: '' },  },
    reducers: {
        toggle(state) {
            state.cartVisible = !state.cartVisible;
        },
        showNotification(state, action) {
            const { status, title, message } = action.payload;
            state.notification = { status, title, message };
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;