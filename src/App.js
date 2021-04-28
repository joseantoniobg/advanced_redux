import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { cartActions, fetchCartData, sendCartData } from './store/cart-slice';
import { Fragment } from 'react';

function App() {

  const showCart = useSelector(state => state.ui.cartVisible);
  const { status, title, message } = useSelector(state => state.ui.notification);
  const changed =  useSelector(state => state.cart.changed)

  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }
    if (changed) {
       dispatch(sendCartData(cart));
       dispatch(cartActions.setChangedToFalse());
    }
  }, [cart, dispatch, changed])

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
