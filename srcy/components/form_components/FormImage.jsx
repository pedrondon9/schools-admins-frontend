// components/media/FormImage.jsx
import React from 'react';
import { Box } from '@mui/material';

const FormImage = ({ src, alt }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <img src={src} alt={alt} width={250} loading="lazy" />
    </Box>
  );
};

export default FormImage;
