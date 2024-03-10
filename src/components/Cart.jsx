import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import { Contact } from './contact';
import JsonData from "../data/data.json";


const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const handleEmptyCart = () => {
    onEmptyCart();
    // Clear cart in browser storage
    sessionStorage.removeItem('cart');
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckoutSubmit = (formData) => {
    // Perform actions with the submitted data, e.g., make an API call
    alert('Thank you for your order! For any edits, please call us or email us.');
    // Clear cart after successful submission
    handleEmptyCart();
    // Optionally, reset the form state or perform other actions
    setShowCheckoutForm(false);
  };

  const checkoutFormRef = useRef(null);

  useEffect(() => {
    // If showCheckoutForm is true, scroll to or focus on the CheckoutForm section
    if (showCheckoutForm) {
      checkoutFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showCheckoutForm]);

  const EmptyCart = () => (
    <div className="cartxy">
      <p>Your cart Feeling Lonely.</p>
      <Link to="/Shop">
        <button className="btn btn-custom btn-lg" fdprocessedid="n7u8zq">
          Back to Shop
        </button>
      </Link>
    </div>
  );

  const FilledCart = () => {
    const subtotal = cart.line_items.reduce(
      (acc, lineItem) => acc + lineItem.price.raw * lineItem.quantity,
      0
    );
  
    return (
      <>
        {cart && cart.line_items && cart.line_items.length > 0 ? (
          <>
            <tbody>
              {cart.line_items.map((lineItem) => (
                <tr key={lineItem.id} className="divcarttttt">
                  <CartItem
                    item={lineItem}
                    onUpdateCartQty={onUpdateCartQty}
                    onRemoveFromCart={onRemoveFromCart}
                  />
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                  <strong>Subtotal:</strong>
                </td>
                <td>
                  <strong>{subtotal.toFixed(2)}</strong>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="5" className="proceed-to-checkout"></td>
              </tr>
            </tfoot>
          </>
        ) : null}
  
        {/* Conditionally render the CheckoutForm */}
        {showCheckoutForm && <CheckoutForm onSubmit={handleCheckoutSubmit} />}
      </>
    );
  };
  

  return (
    <div>
      <div className="carttt">
        <h3 className="h3cart">Shopping Cart</h3>
        {cart && cart.line_items && cart.line_items.length > 0 ? (
          <div className="fff">
            <div className="tblewidth">
              <table className="tbleee">
                <thead>
                  <tr>
                    <th>
                      <p>PRODUCT DETAILS</p>
                    </th>
                    <th>
                      <p>UNIT PRICE</p>
                    </th>
                    <th>
                      <p>QUANTITY</p>
                    </th>
                    <th>
                      <p>AMOUNT</p>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                                <FilledCart />

              </table>

              <button onClick={handleEmptyCart} className="btn btn-custom btn-lg" fdprocessedid="n7u8zq">
                Empty Cart
              </button>
              <button className="btn btn-custom btn-lg" fdprocessedid="n7u8zq" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>

      <div ref={checkoutFormRef}>{showCheckoutForm && <CheckoutForm onSubmit={handleCheckoutSubmit} />}</div>

      <Contact data={landingPageData.Contact}/>
    </div>
  );
};

export default Cart;
