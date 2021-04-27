import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { uiActions } from './store/ui-slice';
import { Fragment } from 'react';

function App() {

  const showCart = useSelector(state => state.ui.cartVisible);
  const { status, title, message } = useSelector(state => state.ui.notification);

  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch();

  useEffect(() => {

    if (cart.totalQuantity > 0) {
      const fetchCartData = async () => {
      try {
        dispatch(uiActions.showNotification({ status: 'pending', title: 'Sending Request', message: 'Your cart is being saved...' }))
        const response = await fetch('https://http-react-default-dddd.firebaseio.com/cart.json', { method: 'PUT', body: JSON.stringify(cart) })

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

          dispatch(uiActions.showNotification({ status: 'success', title: 'Cart Saved', message: 'Your cart was saved!' }))

        } catch (error) {
          dispatch(uiActions.showNotification({ status: 'error', title: 'Error while saving', message: error.message }))
        }
      }

      fetchCartData();
    }
  }, [cart, dispatch])

  return (
    <Fragment>
      { message !== '' && <Notification status={status} title={title} message={message} /> }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
