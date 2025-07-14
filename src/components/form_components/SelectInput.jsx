// components/inputs/SelectInput.jsx
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";

const SelectInput = ({ name, label, options = [], register, validation, error }) => {
  return (
    <FormControl fullWidth error={!!error} size="small">
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={label}
        defaultValue=""
        {...register(name, validation)}  
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>


  );
};

export default SelectInput;
