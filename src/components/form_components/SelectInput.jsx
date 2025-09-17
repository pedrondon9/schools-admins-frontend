// components/inputs/SelectInput.jsx
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

const SelectInput = ({ name, label, options = [], register, validation, error }) => {
  return (
    <FormControl fullWidth error={!!error} size="large" sx={{ mb: 2 }}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        defaultValue={''}
        labelId={`${name}-label`}
        label={label}
        {...register(name, validation)}
      >
        {options.map((opt) => (
          <MenuItem key={opt.label} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
