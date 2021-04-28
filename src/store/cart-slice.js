import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0, totalAmount: 0, changed: false },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.totalAmount = action.payload.totalAmount;
            state.items = action.payload.items;
        },
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

            state.changed = true;
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

            state.changed = true;
        },
        setChangedToFalse(state) {
            state.changed = false;
        }
    }
})

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
             const response = await fetch('https://http-react-default-xxxx.firebaseio.com/cart.json')

             if (!response.ok) {
                throw new Error('Could not fecth the response from server');
             }

             const data = await response.json()

             return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                                               items: cartData?.items ?? [],
                                               totalQuantity: cartData?.totalQuantity ?? 0,
                                               totalAmount: cartData?.totalAmount ?? 0
                                            }));
        } catch (error) {
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error while fetching data', message: error.message }))
        }
    };
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending Cart Data!',
            })
        );

      const fetchCartData = async () => {
      try {
        dispatch(uiActions.showNotification({ status: 'pending', title: 'Sending wwRequest', message: 'Your cart is being saved...' }))
        const response = await fetch('https://http-react-default-xxxx.firebaseio.com/cart.json',
                                     { method: 'PUT',
                                       body: JSON.stringify({
                                                              items: cart.items,
                                                              totalQuantity: cart.totalQuantity,
                                                              totalAmount: cart.totalAmount
                                                            })
                                                        })

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

          dispatch(uiActions.showNotification({ status: 'success', title: 'Cart Saved', message: 'Your cart was saved!' }))

        } catch (error) {
          dispatch(uiActions.showNotification({ status: 'error', title: 'Error while saving', message: error.message }))
        }
      }

      fetchCartData();

    };
}

export const cartActions = cartSlice.actions;

export default cartSlice;