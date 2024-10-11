// /app/customer/[id]/page.js
"use client";
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

const CustomerDetailPage = ({ params }) => {
  const [customer, setCustomer] = useState(null);
  const { id } = params;

  const fetchCustomerDetail = async () => {
    const response = await fetch(`/api/customer/${id}`);
    const data = await response.json();
    setCustomer(data);
  };

  useEffect(() => {
    fetchCustomerDetail();
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <Container>
      <h1>{customer.name}</h1>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests.join(', ')}</p>
    </Container>
  );
};

export default CustomerDetailPage;
