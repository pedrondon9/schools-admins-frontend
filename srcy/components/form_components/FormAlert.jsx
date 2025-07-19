import React from 'react';
import { Alert } from '@mui/material';

const FormAlert = ({ message }) => {
  return <Alert severity="error">{message}</Alert>;
};

export default FormAlert;
