import React, { useEffect, useState, useRef } from 'react';
import Product from './Product';
import { Col, Container, Row, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Features } from './features';
import { Contact } from './contact';
import { About } from './about';
import JsonData from "../data/data.json";
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Shop = ({ products, onAddToCart }) => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'price') {
      return a.price.raw - b.price.raw;
    }
    return 0;
  });

  const handleAddToCart = (productId, quantity) => {
    const product = products.find((p) => p.id === productId);

    onAddToCart(productId, quantity);

    if (product) {
      toast.success(`${product.name} added to the cart`, {
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  return (
    <div>
      <Container className="SHOPALLL">
        <div className="search-and-sort">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div ref={dropdownRef}>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="search-and">
              <DropdownToggle caret>
                Sort by: {sortOption ? sortOption.toUpperCase() : 'None'}
              </DropdownToggle>
              <DropdownMenu className="search-anddd">
                <DropdownItem className="search-andddd" onClick={() => setSortOption('name')}>Sort by Name</DropdownItem>
                <DropdownItem className="search-andddd" onClick={() => setSortOption('price')}>Sort by Price</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {sortedProducts.length > 0 ? (
          <Row>
            {sortedProducts.map((product) => (
              <Col md="4" sm="12" key={product.id}>
                <Product product={product} onAddToCart={handleAddToCart} />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No products available</p>
        )}
      </Container>

      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Contact data={landingPageData.Contact} />

      {/* ToastContainer for displaying alerts */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Shop;
