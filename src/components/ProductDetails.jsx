import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { commerce } from '../lib/commerce'; // Import your configured Commerce.js instance

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await commerce.products.retrieve(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    // Implement your addToCart logic here
    if (product) {
      onAddToCart(product.id, 1);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={product.media.source} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price.formatted}</p>
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Additional Photos</h3>
          <Row>
            {product.media.gallery.map((photo) => (
              <Col key={photo.id} md={4}>
                <Image src={photo.source} alt={product.name} fluid />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
