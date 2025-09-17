import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextFieldInput = ({
  name,
  label,
  type = 'text',
  register,
  validation,
  error,
  helperText,
  startIcon,
  showPassword = false,
  onChange,
  togglePasswordVisibility,
  defaultValue,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      defaultValue={defaultValue}
      type={type}
      InputLabelProps={{
        shrink: true, // Mantiene el label arriba
      }}
      {...register(name, validation)}
      error={!!error}
      sx={{ mb: 1 }}
      helperText={helperText}
      size="large"
      InputProps={{
        startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
      }}
    />
  );
};

export default TextFieldInput;
