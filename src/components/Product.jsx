import React, { useState } from 'react';
import { RiShoppingBasket2Fill } from 'react-icons/ri';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const Product = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
    setIsAdded(true);

    // Reset the button state after a delay (e.g., 2 seconds)
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="productitemm">
      <Card style={{ width: '30rem' }}>
        <CardImg top width="100%" src={product.image.url} alt={product.name} className="img1item" />
        <CardBody>
          <CardTitle tag="h4">{product.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h5">
            ${product.price.formatted}
          </CardSubtitle>
          <Button
            onClick={handleAddToCart}
            style={{ backgroundColor: isAdded ? 'green' : '' }}
          >
            {isAdded ? 'Item Added' : `Add to Cart`} <RiShoppingBasket2Fill />
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Product;
