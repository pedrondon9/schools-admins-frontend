// components/media/FormImage.jsx
import React from 'react';
import { Box } from '@mui/material';

const FormImage = ({ src, alt }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <img
        style={{
        }}
        src={src}
        alt={alt}
        width={80}
        loading="lazy"
      />
    </Box>
  );
};

export default FormImage;
