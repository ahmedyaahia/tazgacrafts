import React from 'react';
import { RiShoppingBasket2Fill } from 'react-icons/ri';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="productitemm">
      <Card style={{ width: '30rem' }}>
        <CardImg top width="100%" src={product.image.url} alt={product.name} className="img1item" />
        <CardBody>
          <CardTitle tag="h4">{product.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h5">
            ${product.price.formatted}
          </CardSubtitle>
          <Button onClick={() => onAddToCart(product.id, 1)}>
            Add to Cart <RiShoppingBasket2Fill />
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Product;
