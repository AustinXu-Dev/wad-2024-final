import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const CustomerForm = ({ onSubmit, existingCustomer }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    if (existingCustomer) {
      setName(existingCustomer.name);
      setDateOfBirth(existingCustomer.dateOfBirth.split('T')[0]); // Format for input
      setMemberNumber(existingCustomer.memberNumber);
      setInterests(existingCustomer.interests.join(', '));
    } else {
      setName('');
      setDateOfBirth('');
      setMemberNumber('');
      setInterests('');
    }
  }, [existingCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerData = { name, dateOfBirth, memberNumber, interests: interests.split(',') };
    onSubmit(customerData);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        my: 3, 
        p: 3, 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        boxShadow: 2 
      }}
    >
      <Typography variant="h6" gutterBottom>
        {existingCustomer ? 'Edit Customer' : 'Add New Customer'}
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Member Number"
        type="number"
        value={memberNumber}
        onChange={(e) => setMemberNumber(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Interests (comma separated)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {existingCustomer ? 'Update Customer' : 'Add Customer'}
      </Button>
    </Box>
  );
};

export default CustomerForm;
