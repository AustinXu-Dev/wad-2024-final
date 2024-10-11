"use client";
import { Box, Container, Typography } from '@mui/material';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import { useState, useEffect } from 'react';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = async () => {
    const response = await fetch('/api/customer');
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
    await fetch(`/api/customer/${id}`, {
      method: 'DELETE',
    });
    fetchCustomers(); // Re-fetch customers after deletion
  };

  const handleSubmit = async (customerData) => {
    if (editingCustomer) {
      // Update existing customer
      await fetch(`/api/customer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...customerData, _id: editingCustomer._id }),
      });
    } else {
      // Add new customer
      await fetch(`/api/customer`, {
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
