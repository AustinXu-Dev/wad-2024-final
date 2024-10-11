import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';

const CustomerList = ({ customers, onEdit, onDelete }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {customers.map((customer) => (
        <Box key={customer._id} display="flex" flexDirection="column" gap={1}>
          <Link href={`/customer/${customer._id}`} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                },
              }}
            >
              <Typography variant="h6">{customer.name}</Typography>
              <Typography variant="body2">Member No: {customer.memberNumber}</Typography>
            </Box>
          </Link>
          <Box display="flex" gap={1}>
            <Button variant="outlined" onClick={() => onEdit(customer)}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => onDelete(customer._id)}>
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CustomerList;
