// src/Unauthorized.tsx
import React from 'react';
import { Typography } from '@mui/material';

const Unauthorized: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Welcome</Typography>
      <Typography variant="body1">Please log in to access this content.</Typography>
    </div>
  );
};

export default Unauthorized;
