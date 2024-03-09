import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { commerce } from "./Ecommerce";
import SmoothScroll from "smooth-scroll";

// components
import Navigation from './components/navigation';
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import CheckoutForm from './components/CheckoutForm';

 //style 
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})



  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    try {
      const response = await commerce.cart.retrieve();
      console.log('Cart response:', response);
      setCart(response);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    console.log('Item added to cart');
    setCart(item.cart);
    await fetchCart();
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    console.log('Cart quantity updated');
    setCart(response.cart);
    await fetchCart();
  };

  const handleRemoveFromCart = async (lineItemId) => {
    try {
      const response = await commerce.cart.remove(lineItemId);
      setCart(response.cart); // Update the cart state
      console.log('Cart updated after removal:', response.cart); // Log the updated cart immediately
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
    await fetchCart();
  };



  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };





  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      await fetchCart();
    };

    fetchData();
  }, []);

  console.log(products); // 2 product 
  console.log(cart); //

  return (
    <BrowserRouter>
      <div>
        <Navigation fetchCart={fetchCart}  totalItems={cart ? cart.total_items : 0} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop  products={products} onAddToCart={handleAddToCart} />} />
          <Route path='/Cart' element={<Cart cart={cart} fetchProducts={fetchProducts} fetchCart={fetchCart}
            onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />} />
          <Route path='/CheckoutForm' element={<CheckoutForm />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
