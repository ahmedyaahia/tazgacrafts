import React, { useEffect, useState } from 'react';
import Product from './Product';
import { Col, Container, Row, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Features } from './features';
import { Contact } from './contact';
import { About } from './about';
import JsonData from "../data/data.json";

const Shop = ({ products, onAddToCart }) => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setDropdownOpen(false); // Close the dropdown when an option is clicked
  };

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
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="search-and">
            <DropdownToggle caret onClick={toggleDropdown}>
              Sort by: {sortOption ? sortOption.toUpperCase() : 'None'}
            </DropdownToggle>
            <DropdownMenu className="search-anddd">
              <DropdownItem className="search-andddd" onClick={() => handleSortOptionClick('name')}>Sort by Name</DropdownItem>
              <DropdownItem className="search-andddd" onClick={() => handleSortOptionClick('price')}>Sort by Price</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {sortedProducts.length > 0 ? (
          <Row>
            {sortedProducts.map((product) => (
              <Col md="4" sm="12" key={product.id}>
                <Product product={product} onAddToCart={onAddToCart} />
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
    </div>
  );
};

export default Shop;
