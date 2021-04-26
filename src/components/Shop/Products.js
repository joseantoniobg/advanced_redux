import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const DUMMY_PRODUCTS = [
    { id: '1', price: 6, title: 'My First Book', description: 'The first book I ever wrote' },
    { id: '2', price: 9.99, title: 'Premium toilet paper', description: 'That part you know will be so grateful!' },
    { id: '3', price: 5999.56, title: 'OLED TV', description: 'This expensive TV has a 85\'\' OLED display you can\'t complain about' }
  ];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => {
          return (<ProductItem
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />);
        })}

      </ul>
    </section>
  );
};

export default Products;
