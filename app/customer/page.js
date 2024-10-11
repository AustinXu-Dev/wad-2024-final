"use client";
import { Box, Container, Typography } from '@mui/material';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import { useState, useEffect } from 'react';

const CustomerPage = () => {
    const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    const response = await fetch(`${APIBASE}/customer`);
    const data = await response.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleDelete = async (id) => {
    await fetch(`${APIBASE}/customer/${id}`, {
      method: 'DELETE',
    });
    fetchCustomers(); // Re-fetch customers after deletion
  };

  const handleSubmit = async (customerData) => {
    if (editingCustomer) {
      // Update existing customer
      await fetch(`${APIBASE}/customer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...customerData, _id: editingCustomer._id }),
      });
    } else {
      // Add new customer
      await fetch(`${APIBASE}/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
    }
    setEditingCustomer(null); // Clear editing state
    fetchCustomers(); // Re-fetch customers
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>
      <CustomerForm onSubmit={handleSubmit} existingCustomer={editingCustomer} />
      <CustomerList customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
};

export default CustomerPage;
