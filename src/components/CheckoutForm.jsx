import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';

const CheckoutForm = ({ onSubmit }) => {
  const isMounted = useRef(true); // useRef to track component mount status
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    altPhone: '',
    address: '',
    email: '',
    additionalRequest: '',
  });

  useEffect(() => {
    // Component did mount
    isMounted.current = true;

    return () => {
      // Component will unmount
      isMounted.current = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);

    const serviceId = 'service_op2mi4b';
    const templateId = 'template_z4yfspu';
    const userId = 'ic4g6VUE7LxdN30wN';

    try {
      const response = await emailjs.send(serviceId, templateId, { data: formData }, userId);
      console.log('Email sent successfully:', response);

      if (isMounted.current) {
        // Check if the component is still mounted before updating the state
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          altPhone: '',
          address: '',
          email: '',
          additionalRequest: '',
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container checkout-form">
      <h2>Shipping Details</h2>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">First Name:</Label>
            <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="lastName">Last Name:</Label>
            <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="phone">Phone:</Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="altPhone">Alt Phone:</Label>
            <Input type="tel" id="altPhone" name="altPhone" value={formData.altPhone} onChange={handleChange} />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label for="address">Address:</Label>
        <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label for="email">Email:</Label>
        <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label for="additionalRequest">Additional Request:</Label>
        <Input type="textarea" id="additionalRequest" name="additionalRequest" value={formData.additionalRequest} onChange={handleChange} />
      </FormGroup>

      <Button type="submit">Complete </Button>
    </Form>
  );
};

export default CheckoutForm;
