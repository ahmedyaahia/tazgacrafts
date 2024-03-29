import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingBasket } from 'react-icons/fa';
import { Collapse, NavbarToggler } from "reactstrap";


const Navigation = ({ totalItems }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth < 768); // Set to true if screen width is below 768px

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Update isOpen state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileView = window.innerWidth < 768;

  return (
    <div>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                {" "}
                <span className="sr-only">Toggle navigation</span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
                <span className="icon-bar"></span>{" "}
              </button>
              <a className="navbar-brand page-scroll" href="/#page-top">
                TAZGA
              </a>
            </div>

            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a className="navbar-brand page-scroll" href="/#page-top">
                    Home
                  </a>{""}
                </li>



                {/*            <li>
            <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
  </li> */}
                <li>
                  <NavLink to="/Shop" className="page-scroll">
                    Shop
                  </NavLink>
                </li>
                <li>
                  {<a href="/#services" className="page-scroll">
                    Services
                  </a>}
                </li>
                <li>
                  <a href="/#portfolio" className="page-scroll">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/#about" className="page-scroll">
                    About
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="page-scroll">
                    Contact
                  </a>
                </li>
                <li>
                  <NavLink className="cartLink" to="/Cart">
                    <span>{totalItems}</span>
                    <FaShoppingBasket className='iconnm' />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Collapse>

      {isMobileView && (
        <div className="fixed-cart-icon">
          <NavLink className="cartLink" to="/Cart">
            <span>{totalItems}</span>
            <FaShoppingBasket className='iconnm' />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navigation;

